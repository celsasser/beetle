/**
 * Date: 11/2/19
 * Time: 7:48 PM
 * @license MIT (see project's LICENSE file)
 */

import * as assert from "assert";
import {
	NextFunction,
	Request,
	Response
} from "express";
import {format as formatUrl} from "url";
import {Server} from "../server";
import {
	HttpMethod,
	HttpResponse
} from "../types/server";

export abstract class ControllerBase {
	public readonly method: HttpMethod;
	public readonly path: string;
	public readonly server: Server;

	public constructor(server: Server, method: HttpMethod, path: string) {
		assert.ok(path.startsWith("/"), "more unexpected results than expected");
		this.method = method;
		this.path = path;
		this.server = server;
	}

	/**
	 * Gets a textual description of this route on this host
	 */
	get description(): string {
		const url = formatUrl({
			hostname: "localhost",
			pathname: this.path,
			port: this.server.port,
			protocol: this.server.protocol
		});
		return `[${this.method.toUpperCase()}] ${url}`;
	}

	/**
	 * Gets brief function of this controller
	 */
	public abstract get purpose(): string;

	/**
	 * The route handler
	 */
	public abstract handler(req: Request, res: Response, next?: NextFunction): void;

	/*********************
	 * Protected Interface
	 * *********************/
	protected sendFailure(res: Response, {
		error,
		contentType = "text/plain",
		statusCode = 400
	}: {
		error: Error
		contentType?: string,
		statusCode?: number
	}) {
		res.status(statusCode)
			.contentType(contentType)
			.send(error.message);
	}

	protected sendSuccess(res: Response, {
		body,
		contentType = "application/json",
		headers,
		statusCode = 200
	}: HttpResponse = {}) {
		Object.entries(headers || {})
			.forEach(([value, key]) => {
				res.header(key, value);
			});
		res.contentType(contentType)
			.status(statusCode)
			.send(body);
	}
}
