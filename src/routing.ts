/**
 * Date: 11/2/19
 * Time: 7:59 PM
 * @license MIT (see project's LICENSE file)
 */

import {ControllerBase} from "./controller/base";
import map from "./map";
import {HttpMethod} from "./types/server";

/**
 * Sets up the controllers route and adds controller to our own internal map
 */
export function addController(controller: ControllerBase, routeId: string = createRouteId(controller.method, controller.path)): void {
	controller.server.router[controller.method](controller.path, controller.handler.bind(controller));
	map.routeIdToController.set(routeId, controller);
	console.log(`${controller.cliSummary}`);
}

export function createRouteId(method: HttpMethod, path: string): string {
	return `urn:${method}:${path.toLowerCase()}`;
}

/**
 * Removes this route from the express router and from our map
 */
export function removeController(routeId: string): void {
	const controller = map.getControllerByRoute(routeId);
	map.routeIdToController.delete(routeId);
	try {
		// todo: figure out a better method
		controller.server.router[controller.method](controller.path, () => {
		});
	} catch(error) {
		console.warn(`controller.removeRoute(): exception thrown when trying to remove route - ${error}`);
	}
}
