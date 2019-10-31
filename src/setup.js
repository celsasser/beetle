/**
 * Date: 10/30/19
 * Time: 10:26 PM
 * @license MIT (see project's LICENSE file)
 */

const _ = require("lodash");
const fs = require("fs-extra");
const {formatProxySummary} = require("./utils");

/**
 * @param {string} path
 * @returns {ProxySetup}
 */
function loadSetup(path) {
	try {
		const setup = fs.readJSONSync(path);
		return _conditionSetup(setup);
	} catch(error) {
		throw new Error(`failed to load setup: ${error}`);
	}
}


/**
 * @param {ProxySetup} setup
 * @param {Server} server
 */
function processProxySetup(setup, server) {
	_.forEach(setup.proxies, configuration => {
		server.addProxyConfiguration(configuration);
		console.log(`Listening for ${formatProxySummary(configuration)} - action=${configuration.action.type}`);
	});
}

/**
 * @param {ProxySetup} setup
 */
function _conditionSetup(setup) {
	try {
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
		throw new Error(`failed to condition the proxy setup - ${error}`);
	}
}



module.exports = {
	loadSetup,
	processProxySetup
};
