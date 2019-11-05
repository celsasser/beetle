/**
 * Date: 11/2/19
 * Time: 7:59 PM
 * @license MIT (see project's LICENSE file)
 */

// tslint:disable-next-line: no-var-requires
import {ControllerBase} from "./controller/base";
import {createUrn} from "./core/urn";
import {formatProxySummary} from "./core/utils";
import {UrnTypeId} from "./types/core";


const controllerMap: {[id: string]: ControllerBase} = {};

/**
 * Sets up the controllers route and adds controller to our own internal map
 */
export function addRoute(controller: ControllerBase, id = createUrn(UrnTypeId.ROUTE)): void {
	if(id in controllerMap) {
		console.error(`controller.addRoute(): ${id} is being reused`);
	}
	controller.server.router[controller.method](controller.path, controller.route.bind(controller));
	controllerMap[id] = controller;
	console.log(`${controller.cliSummary}`);
}

/**
 * Removes this route from the express router and from our map
 */
export function removeRoute(id: string): void {
	if(!(id in controllerMap)) {
		console.error(`controller.removeRoute(): ${id} does not exist`);
	} else {
		const controller = controllerMap[id];
		delete controllerMap[id];
		try {
			// todo: figure out a better method
			controller.server.router[controller.method](controller.path, () => {});
		} catch(error) {
			console.warn(`controller.removeRoute(): exception thrown when trying to remove route - ${error}`);
		}
	}
}
