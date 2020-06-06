/**
 * Date: 11/2/19
 * Time: 7:59 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {ControllerBase} from "./controller/base";
import * as log from "./core/log";
import beetleMap from "./map";
import {HttpMethod, RouteProperties} from "./types";

/**
 * Sets up the controllers route and adds controller to our own internal beetleMap
 */
export function addController(controller: ControllerBase, routeId: string = createRouteId(controller.method, controller.path)): void {
	controller.server.router[controller.method](controller.path, controller.handler.bind(controller));
	beetleMap.routeIdToController.set(routeId, controller);
}

export function createRouteId(method: HttpMethod, path: string): string {
	return `urn:${method}:${path.toLowerCase()}`;
}

/**
 * Gets a description of the routes we are currently listening for
 */
export function getCurrentRouteConfiguration(): RouteProperties[] {
	return _.chain(Array.from(beetleMap.routeIdToController.values()))
		.map((controller: ControllerBase): RouteProperties => ({
			hostname: "localhost",
			method: controller.method,
			path: controller.path,
			port: controller.server.port,
			protocol: controller.server.protocol,
			purpose: controller.purpose
		}))
		.value();
}

/**
 * Removes this route from the express router and from our beetleMap
 */
export function removeController(routeId: string): void {
	const controller = beetleMap.getControllerByRoute(routeId);
	beetleMap.routeIdToController.delete(routeId);
	try {
		// todo: figure out a better method
		controller.server.router[controller.method](controller.path, () => {
		});
	} catch(error) {
		log.warn(`controller.removeRoute(): exception thrown when trying to remove route - ${error}`);
	}
}
