/**
 * Date: 10/30/19
 * Time: 10:26 PM
 * @license MIT (see project's LICENSE file)
 */

import * as fs from "fs-extra";
import * as _ from "lodash";
import {Server} from "./server";
import {
	ProxyAction,
	ProxyConfiguration,
	ProxyProtocol,
	ProxySetup
} from "./types/proxy";
import {formatProxySummary} from "./utils";

/**
 * Loads setup file from local file system
 */
export function loadSetup(path: string): ProxySetup {
	try {
		const setup = fs.readJSONSync(path);
		return _conditionSetup(setup);
	} catch(error) {
		throw new Error(`failed to load setup: ${error}`);
	}
}

export function processProxySetup(setup: ProxySetup, server: Server): void {
	_.forEach(setup.proxies, configuration => {
		server.addProxyConfiguration(configuration);
		console.log(`Listening for ${formatProxySummary(configuration)} - action=${configuration.action.type}`);
	});
}

/**
 * @throws {Error}
 */
export function _conditionSetup(setup: ProxySetup): ProxySetup {
	try {
		// do a little conditioning so that we can make assumptions from here on
		if(!setup.server.protocol) {
			setup.server.protocol = ProxyProtocol.HTTP;
		}
		// We don't currently support different protocols per route. But we may and we want it
		// for reporting purposes.
		setup.proxies = _.map(setup.proxies, _conditionProxyConfiguration.bind(null, setup));
		return setup;
	} catch(error) {
		throw new Error(`failed to condition the proxy setup - ${error}`);
	}
}

export function _conditionProxyConfiguration(setup: ProxySetup, cfg: ProxyConfiguration): ProxyConfiguration {
	// We don't currently support different protocols per route. But we may and we want it
	// for reporting purposes.
	cfg.proxy.protocol = setup.server.protocol;
	if(cfg.action.type === ProxyAction.LOG) {
		// here we ask for a response. If they did not provide one then we assume defaults
		cfg.action.response = {};
	}
	return cfg;
}
