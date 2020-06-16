/**
 * Date: 11/15/19
 * Time: 12:09 AM
 * @license MIT (see project's LICENSE file)
 */

import {NextFunction, Request, Response} from "express";
import {getCurrentRouteConfiguration} from "../routing";
import {ControllerBase} from "./base";

/**
 * Gets the current route configuration and sends it back to client
 */
export class ControllerGetRouteConfiguration extends ControllerBase {
	get purpose(): string {
		return "Explore Routes";
	}

	public handler(req: Request, res: Response, next: NextFunction = (error: any) => {}): void {
		const descriptions = getCurrentRouteConfiguration();
		super.sendSuccess(res, {
			body: descriptions
		});
		next();
	}
}
