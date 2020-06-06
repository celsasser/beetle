/**
 * Date: 11/4/19
 * Time: 8:23 PM
 * @license MIT (see project's LICENSE file)
 */

import {NextFunction, Request, Response} from "express";
import {getSchemaResourcePath} from "../resources";
import {addProxyStub, removeProxyStub} from "../setup";
import validate from "../validate";
import {ControllerBase} from "./base";

// tslint:disable: max-classes-per-file

/**
 * Allow configurations to be added via route
 */
export class ControllerStubAdd extends ControllerBase {
	get purpose(): string {
		return "Add stub";
	}

	public handler(req: Request, res: Response, next: NextFunction = (error?: any) => {}): void {
		try {
			validate.validateData(getSchemaResourcePath("request/schema-stub-add.json"), {
				body: req.body,
				params: req.params
			});
			addProxyStub(this.server, req.body);
			this.sendSuccess(res);
			process.nextTick(next);
		} catch(error) {
			this.sendFailure(res, {error});
			process.nextTick(next, error);
		}
	}
}

/**
 * Allow configurations to be removed via route
 */
export class ControllerStubRemove extends ControllerBase {
	get purpose(): string {
		return "Remove stub";
	}

	public handler(req: Request, res: Response, next: NextFunction = (error: any) => {}): void {
		try {
			validate.validateData(getSchemaResourcePath("request/schema-stub-remove.json"), {
				body: req.body,
				params: req.params
			});
			removeProxyStub(req.body);
			this.sendSuccess(res);
			process.nextTick(next);
		} catch(error) {
			this.sendFailure(res, {error});
			process.nextTick(next, error);
		}
	}
}
