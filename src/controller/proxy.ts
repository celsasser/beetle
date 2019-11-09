/**
 * Date: 11/4/19
 * Time: 8:23 PM
 * @license MIT (see project's LICENSE file)
 */

import {
	Request,
	Response
} from "express";
import {
	addProxyStub,
	removeProxyStub
} from "../setup";
import validate from "../validate";
import {ControllerBase} from "./base";

/**
 * Allow configurations to be added via route
 */
export class ControllerProxyAdd extends ControllerBase {
	public get cliSummary(): string {
		return `Add proxy/proxies: ${this.routeDescription}`;
	}

	public handler(req: Request, res: Response): void {
		try {
			validate.validateData("./schemas/request/schema-proxy-add.json", {
				body: req.body,
				params: req.params
			});
			addProxyStub(req.body, this.server);
			this.sendSuccess(res);
		} catch(error) {
			this.sendFailure(res, {error});
		}
	}
}

/**
 * Allow configurations to be removed via route
 */
// tslint:disable-next-line: max-classes-per-file
export class ControllerProxyRemove extends ControllerBase {
	public get cliSummary(): string {
		return `Remove proxy/proxies: ${this.routeDescription}`;
	}

	public handler(req: Request, res: Response): void {
		try {
			validate.validateData("./schemas/request/schema-proxy-remove.json", {
				body: req.body,
				params: req.params
			});
			removeProxyStub(req.body);
			this.sendSuccess(res);
		} catch(error) {
			this.sendFailure(res, {error});
		}
	}
}
