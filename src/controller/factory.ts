/**
 * Date: 11/2/19
 * Time: 7:59 PM
 * @license MIT (see project's LICENSE file)
 */

// tslint:disable-next-line: no-var-requires
import {createUrn} from "../core/urn";
import {UrnTypeId} from "../types/core";
import {ControllerBase} from "./base";


const controllerMap: {[id: string]: ControllerBase} = {};

export function addRoute(controller: ControllerBase, id = createUrn(UrnTypeId.ROUTE)): void {
	if(id in controllerMap) {
		console.error(`controller.addRoute(): ${id} is being reused`);
	}
	controller.server.router[controller.method](controller.path, controller.route.bind(controller));
	controllerMap[id] = controller;
}

export function removeRoute(id: string): void {
	if(!(id in controllerMap)) {
		console.error(`controller.removeRoute(): ${id} does not exist`);
	} else {
		const controller = controllerMap[id];
		delete controllerMap[id];
		try {
			// todo: figure out a better method
			controller.server.router[controller.method](controller.path, ()=>{});
		} catch(error) {
			console.warn(`controller.removeRoute(): exception thrown when trying to remove route - ${error}`);
		}
	}
}
