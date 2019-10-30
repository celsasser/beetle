/**
 * Copyright (c) 2018 Home Box Office, Inc. as an unpublished
 * work. Neither this material nor any portion hereof may be copied or
 * distributed without the express written consent of Home Box Office, Inc.
 *
 * This material also contains proprietary and confidential information
 * of Home Box Office, Inc. and its suppliers, and may not be used by or
 * disclosed to any person, in whole or in part, without the prior written
 * consent of Home Box Office, Inc.
 */

const _ = require("lodash");
const fs = require("fs-extra");
const {Server} = require("./server");
const {formatProxySummary} = require("./utils");


/**
 * @param {string} path
 * @returns {ProxySetup}
 */
function loadSetup(path) {
	try {
		const setup = fs.readJSONSync(path);
		// do a little conditioning so that we can make assumptions from here on
		if(!setup.server.protocol) {
			setup.server.protocol = "http";
		}
		// We don't currently support different protocols per route. But we may and we want it
		// for reporting purposes.
		setup.proxies = _.map(setup.proxies, proxy => _.merge({
			proxy: {
				protocol: setup.server.protocol
			}
		}, proxy));
		return setup;
	} catch(error) {
		throw new Error(`failed to load setup: ${error}`);
	}
}

/**
 * @returns {{configuration: string}}
 */
function parseCommandLine() {
	if(process.argv.length !== 3) {
		throw new Error("incorrect number of paramaters");
	} else {
		return {
			setupPath: process.argv[2]
		};
	}
}

/**
 * @param {ProxySetup} setup
 */
function run(setup) {
	const server = new Server(setup.server);
	_.forEach(setup.proxies, configuration => {
		server.addProxyConfiguration(configuration);
	});
	server.start()
		.then(() => {
			_.forEach(setup.proxies, configuration => {
				console.log(`Listening for ${formatProxySummary(configuration)} - action=${configuration.action.type}`);
			});
		});
}

try {
	const params = parseCommandLine();
	const setup = loadSetup(params.setupPath);
	run(setup);
} catch(error) {
	console.error(`Attempt to startup failed: ${error.message}`);
	console.log("Usage: node index.js <configuration-path>");
}
