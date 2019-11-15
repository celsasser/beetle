/**
 * Date: 11/15/19
 * Time: 12:09 AM
 * @license MIT (see project's LICENSE file)
 */

import {ControllerBase} from "./base";
import {getCurrentRouteConfiguration} from "../routing";
import {NextFunction, Request, Response} from "express";


/**
 * Gets the current route configuration and sends it back to client
 */
export class ConfigurationGetRouteConfiguration extends ControllerBase {
	get purpose(): string {
		return "Explore Routes";
	}

	handler(req: Request, res: Response, next: NextFunction = (error: Error) => {}): void {
		const descriptions = getCurrentRouteConfiguration();
		super.sendSuccess(res, {
			body: descriptions
		});
		process.nextTick(next);
	}
}
