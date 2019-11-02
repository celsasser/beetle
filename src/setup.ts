/**
 * Date: 10/30/19
 * Time: 10:26 PM
 * @license MIT (see project's LICENSE file)
 */

import * as fs from "fs-extra";
import * as _ from "lodash";
import {Server} from "./server";
import {
	ProxyActionBase,
	ProxyActionType,
	ProxyConfiguration,
	ProxySetup
} from "./types/proxy";
import {formatProxySummary} from "./utils";
import validate from "./validate";

/**
 * Loads setup file from local file system
 * @throws {Error}
 */
export function loadSetup(setupPath?: string): ProxySetup {
	function _load(path: string): ProxySetup {
		try {
			return fs.readJSONSync(path);
		} catch(error) {
			throw new Error(`failed to load setup: ${error}`);
		}
	}

	let setup = _load("./res/defaults/setup-defaults.json");
	if(setupPath) {
		setup = _.merge(setup, _load(setupPath));
	}
	return _conditionSetup(setup);
}

export function processProxySetup(setup: ProxySetup, server: Server): void {
	_.forEach(setup.proxies, cfg => {
		server.addProxyConfiguration(cfg);
		console.log(`Listening for ${formatProxySummary(cfg)} - actions=${cfg.actions.map(action => action.type).join()}`);
	});
}

/**
 * @throws {Error}
 */
function _conditionSetup(setup: ProxySetup): ProxySetup {
	function _conditionProxy(cfg: ProxyConfiguration): ProxyConfiguration {
		cfg.proxy.protocol = setup.server.protocol;
		// let's find the guy who is going to be responsible for responding to the client
		const responder = _.find<ProxyActionBase>(cfg.actions, action => action.type === ProxyActionType.RESPOND)
			|| _.find<ProxyActionBase>(cfg.actions, action => action.type === ProxyActionType.FORWARD)
			|| cfg.actions[0];
		responder.responder = true;
		return cfg;
	}

	try {
		validate.validateData("./res/schemas/schema-setup.json", setup);
		setup.proxies = _.map(setup.proxies, _conditionProxy);
		return setup;
	} catch(error) {
		throw new Error(`failed to condition the proxy setup - ${error}`);
	}
}

