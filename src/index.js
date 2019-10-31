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

const {parseCommandLine} = require("./cli");
const {
	loadSetup,
	processProxySetup
} = require("./setup");
const {Server} = require("./server");


/**
 * Starts up our proxy server as per our setup spec
 * @param {ProxySetup} setup
 * @throws {Error}
 */
function startServer(setup) {
	const server = new Server(setup.server);
	server.start()
		.then(processProxySetup.bind(null, setup, server));
}

try {
	const params = parseCommandLine();
	const setup = loadSetup(params.setupPath);
	startServer(setup);
} catch(error) {
	console.error(`Attempt to startup failed: ${error.message}`);
	console.log("Usage: node index.js <configuration-path>");
}
