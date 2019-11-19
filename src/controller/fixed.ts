/**
 * Date: 11/16/19
 * Time: 8:05 PM
 * @license MIT (see project's LICENSE file)
 */

import {NextFunction, Request, Response} from "express";
import {Server} from "../server";
import {HttpMethod, HttpResponse} from "../types";
import {ControllerBase} from "./base";

/**
 * Responds to requests with response data set at construction time.
 */
export class ControllerFixedResponse extends ControllerBase {
	public readonly resData: HttpResponse;
	private readonly _purpose: string;

	constructor({method, path, purpose, resData, server}: {
		method: HttpMethod,
		path: string,
		purpose: string,
		resData: HttpResponse,
		server: Server
	}) {
		super(server, method, path);
		this.resData = resData;
		this._purpose = purpose;
	}

	get purpose(): string {
		return this._purpose;
	}

	public handler(req: Request, res: Response, next: NextFunction = () => {}): void {
		super.sendSuccess(res, this.resData);
		process.nextTick(next);
	}
}
