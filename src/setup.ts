/**
 * Date: 10/30/19
 * Time: 10:26 PM
 * @license MIT (see project's LICENSE file)
 */

import * as fs from "fs-extra";
import * as _ from "lodash";
import {ControllerAction} from "./controller/action";
import {createUrn} from "./core/urn";
import beetleMap from "./map";
import {getDefaultResourcePath, getSchemaResourcePath} from "./resources";
import {addController, createRouteId} from "./routing";
import {Server} from "./server";
import {MetaProxyStub, ProxySetup, ProxyStub, UrnTypeId} from "./types";
import validate from "./validate";

/**
 * Processes (validates and conditions) the setup and adds each configuration to our server proxy
 * @throws {Error}
 */
export function addProxySetup(server: Server, setup: ProxySetup): void {
	addProxyStub(server, setup.stubs || []);
}

/**
 * Processes (validates and conditions) the configuration and adds it to our server proxy.
 * See our readme about how a single route may be amended with actions and those same actions
 * may be later removed
 * @throws {Error}
 */
export function addProxyStub(server: Server, stub: MetaProxyStub|MetaProxyStub[]): void {
	const stubs: MetaProxyStub[] = Array.isArray(stub)
		? stub
		: [stub];
	stubs.reduce<ProxyStub[]>((accumulator, stub) => {
		return accumulator.concat(metaStubProxyToProxyStub(stub, server));
	}, [])
		.forEach(stub => {
			const routeId = createRouteId(stub.route.method, stub.route.path);
			const controller = beetleMap.routeIdToController.has(routeId)
				? beetleMap.getControllerByRoute<ControllerAction>(routeId)
				: new ControllerAction(server, stub.route);
			controller.addActions(stub.actions);
			addController(controller, routeId);
			beetleMap.stubIdToRouteId.set(stub.id, routeId);
			beetleMap.stubIdToActions.set(stub.id, stub.actions);
		});
}

/**
 * Loads setup file from local file system and merges in server defaults
 * @throws {Error}
 */
export function loadProxySetupByPath(setupPath?: string): ProxySetup {
	function load(path: string): ProxySetup {
		try {
			return fs.readJSONSync(path);
		} catch(error) {
			throw new Error(`failed to load setup: ${error}`);
		}
	}

	let setup = load(getDefaultResourcePath("default-setup.json"));
	if(setupPath) {
		setup = _.merge(setup, load(setupPath));
	}
	validate.validateData(getSchemaResourcePath("schema-server.json"), setup.server);
	return setup;
}

/**
 * Removes actions for the specified ids
 * @throws {Error}
 */
export function removeProxyStub(stubId: string|string[]): void {
	const stubIds: string[] = Array.isArray(stubId)
		? stubId
		: [stubId];
	const errors = stubIds.reduce<string[]>((errors, stubId) => {
		try {
			const routeId = beetleMap.getRouteIdByStubId(stubId);
			const actions = beetleMap.getActionsByStubId(stubId);
			const controller = beetleMap.getControllerByRoute<ControllerAction>(routeId);
			controller.removeActions(actions);
			beetleMap.stubIdToActions.delete(stubId);
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
function metaStubProxyToProxyStub(metaStub: MetaProxyStub, server: Server): ProxyStub[] {
	try {
		const methods = Array.isArray(metaStub.route.method)
			? metaStub.route.method
			: [metaStub.route.method];
		return methods.map(method => {
			const stub = _.chain(metaStub)
				.cloneDeep()
				.set("route.method", method)
				.set("route.protocol", server.protocol)
				.value() as ProxyStub;
			validate.validateData(getSchemaResourcePath("schema-stub.json"), stub);
			if(stub.id === undefined) {
				stub.id = createUrn(UrnTypeId.STUB, stub.route.method);
			}
			return stub;
		});
	} catch(error) {
		throw new Error(`failed to condition the proxy setup - ${error}`);
	}
}
