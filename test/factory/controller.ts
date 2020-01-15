/**
 * Date: 11/9/19
 * Time: 1:10 AM
 * @license MIT (see project's LICENSE file)
 */

import {ControllerAction, ControllerStubAdd, ControllerStubRemove} from "../../src/controller";
import {Server} from "../../src/server";
import {HttpMethod, ProxyActionBase, ProxyRoute} from "../../src/types";
import {createProxyRoute} from "./proxy";
import {createServer} from "./server";

export const CONTROLLER_DEFAULTS = {
	method: HttpMethod.GET,
	path: "/controller/route",
	route: createProxyRoute(),
	server: createServer()
};

export function createControllerAction({
	actions = [],
	server = CONTROLLER_DEFAULTS.server,
	route = CONTROLLER_DEFAULTS.route
}: {
	actions?: ProxyActionBase[],
	server?: Server,
	route?: ProxyRoute
} = {}): ControllerAction {
	const instance = new ControllerAction(server, route);
	instance.addActions(actions);
	return instance;
}

export function createControllerProxyAdd({
	server = CONTROLLER_DEFAULTS.server,
	method = CONTROLLER_DEFAULTS.method,
	path = CONTROLLER_DEFAULTS.path
}: {
	server?: Server,
	method?: HttpMethod,
	path?: string
} = {}): ControllerStubAdd {
	return new ControllerStubAdd(server, method, path);
}

export function createControllerProxyRemove({
	server = CONTROLLER_DEFAULTS.server,
	method = CONTROLLER_DEFAULTS.method,
	path = CONTROLLER_DEFAULTS.path
}: {
	server?: Server,
	method?: HttpMethod,
	path?: string
} = {}): ControllerStubRemove {
	return new ControllerStubRemove(server, method, path);
}
