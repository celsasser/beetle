/**
 * Date: 10/30/19
 * Time: 10:26 PM
 * @license MIT (see project's LICENSE file)
 */

import * as fs from "fs-extra";
import * as _ from "lodash";
import {ControllerAction} from "./controller/action";
import {createUrn} from "./core/urn";
import map from "./map";
import {
	addController,
	createRouteId
} from "./routing";
import {Server} from "./server";
import {
	ProxySetup,
	ProxyStub,
	UrnTypeId
} from "./types";
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
export function addProxySetup(setup: ProxySetup, server: Server): void {
	addProxyStub(setup.stubs || [], server);
}

/**
 * Processes (validates and conditions) the configuration and adds it to our server proxy.
 * See our readme about how a single route may be amended with actions and those same actions
 * may be later removed
 * @throws {Error}
 */
export function addProxyStub(stub: ProxyStub|ProxyStub[], server: Server): void {
	const stubs: ProxyStub[] = _.isArray(stub)
		? stub
		: [stub];
	stubs.map(stub => _conditionProxyStub(stub, server))
		.forEach(stub => {
			const routeId = createRouteId(stub.route.method, stub.route.path);
			const controller = map.routeIdToController.has(routeId)
				? map.getControllerByRoute<ControllerAction>(routeId)
				: new ControllerAction(server, stub.route);
			controller.addActions(stub.actions);
			addController(controller, routeId);
			map.stubIdToRouteId.set(stub.id, routeId);
			map.stubIdToActions.set(stub.id, stub.actions);
		});
}

/**
 * Removes actions for the specified ids
 * @throws {Error}
 */
export function removeProxyStub(stubId: string|string[]): void {
	const stubIds: string[] = _.isArray(stubId)
		? stubId
		: [stubId];
	const errors = stubIds.reduce<string[]>((errors, stubId) => {
		try {
			const routeId = map.getRouteIdByStubId(stubId);
			const actions = map.getActionsByStubId(stubId);
			const controller = map.getControllerByRoute<ControllerAction>(routeId);
			controller.removeActions(actions);
			map.stubIdToActions.delete(stubId);
		} catch(error) {
			errors.push(error.message);
		}
		return errors;
	}, []);
	if(errors.length > 0) {
		throw new Error(errors.join("\n"));
	}
}

/**
 * Makes sure he's ready to live in our big-top
 * @throws {Error}
 */
function _conditionProxyStub(stub: ProxyStub, server: Server): ProxyStub {
	try {
		validate.validateData("./res/schemas/schema-route.json", stub);
		stub = _.cloneDeep(stub);
		stub.route.protocol = server.protocol;
		if(stub.id === undefined) {
			stub.id = createUrn(UrnTypeId.STUB);
		}
		return stub;
	} catch(error) {
		throw new Error(`failed to condition the proxy setup - ${error}`);
	}
}
