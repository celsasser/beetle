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
	private readonly _data: HttpResponse;
	private readonly _purpose: string;

	constructor({data, method, path, purpose, server}: {
		data: HttpResponse,
		method: HttpMethod,
		path: string,
		purpose: string,
		server: Server
	}) {
		super(server, method, path);
		this._data = data;
		this._purpose = purpose;
	}

	get purpose(): string {
		return this._purpose;
	}

	public handler(req: Request, res: Response, next: NextFunction = () => {}): void {
		super.sendSuccess(res, this._data);
		process.nextTick(next);
	}
}
