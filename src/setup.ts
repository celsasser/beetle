/**
 * Date: 10/30/19
 * Time: 10:26 PM
 * @license MIT (see project's LICENSE file)
 */

import * as fs from "fs-extra";
import * as _ from "lodash";
import {ControllerAction} from "./controller/action";
import {addRoute} from "./controller/factory";
import {createUrn} from "./core/urn";
import {formatProxySummary} from "./core/utils";
import {Server} from "./server";
import {UrnTypeId} from "./types/core";
import {
	ProxyActionBase,
	ProxyActionType,
	ProxyConfiguration,
	ProxySetup
} from "./types/proxy";
import validate from "./validate";

/**
 * Loads setup file from local file system and merges in server defaults
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
	validate.validateData("./res/schemas/schema-server.json", setup.server);
	return setup;
}

/**
 * Processes (validates and conditions) the setup and adds each configuration to our server proxy
 * @throws {Error}
 */
export function processProxySetup(setup: ProxySetup, server: Server): void {
	if(setup.proxies !== undefined) {
		processProxyConfiguration(setup.proxies, server);
	}
}

/**
 * Processes (validates and conditions) the configuration and adds it to our server proxy
 * @param cfg - mutates this object
 * @param server
 * @throws {Error}
 */
export function processProxyConfiguration(cfg: ProxyConfiguration|ProxyConfiguration[], server: Server): void {
	const configurations: ProxyConfiguration[] = _.isArray(cfg)
		? cfg
		: [cfg];
	configurations.forEach(configuration => {
		_conditionProxyConfiguration(configuration, server);
		const controller = new ControllerAction(server, configuration);
		addRoute(controller, configuration.id);
		console.log(`Listening for ${formatProxySummary(configuration)} - actions=${configuration.actions.map(action => action.type).join()}`);
	});
}

/**
 */
/**
 * @param cfg - mutates this object
 * @param server
 * @throws {Error}
 */
function _conditionProxyConfiguration(cfg: ProxyConfiguration, server: Server): ProxyConfiguration {
	try {
		validate.validateData("./res/schemas/schema-proxy.json", cfg);
		cfg.proxy.protocol = server.protocol;
		if(!cfg.id) {
			cfg.id = createUrn(UrnTypeId.ROUTE);
		}
		// let's find the guy who is going to be responsible for responding to the client
		const responder = _.find<ProxyActionBase>(cfg.actions, action => action.type === ProxyActionType.RESPOND)
			|| _.find<ProxyActionBase>(cfg.actions, action => action.type === ProxyActionType.FORWARD)
			|| cfg.actions[0];
		responder.responder = true;
		return cfg;
	} catch(error) {
		throw new Error(`failed to condition the proxy setup - ${error}`);
	}
}

