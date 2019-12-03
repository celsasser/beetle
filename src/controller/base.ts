/**
 * Date: 11/2/19
 * Time: 7:48 PM
 * @license MIT (see project's LICENSE file)
 */

import * as assert from "assert";
import {NextFunction, Request, Response} from "express";
import {format as formatUrl} from "url";
import {respondToClient} from "../actions";
import {Server} from "../server";
import {HttpHeaders, HttpMethod, HttpResponse} from "../types/server";

export abstract class ControllerBase {
	public readonly method: HttpMethod;
	public readonly path: string;
	public readonly server: Server;

	public constructor(server: Server, method: HttpMethod, path: string) {
		// There are probably places where a fragment may be useful but it causes grief in our world.
		assert.ok(path.startsWith("/"), `begin "${path}" route's path with "/"?`);
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
		headers,
		statusCode = 400
	}: {
		error: Error
		contentType?: string,
		headers?: HttpHeaders,
		statusCode?: number
	}) {
		respondToClient(res, {
			body: error.message,
			contentType,
			headers,
			statusCode
		});
	}

	protected sendSuccess(res: Response, {
		body,
		contentType = "application/json",
		headers,
		statusCode = 200
	}: HttpResponse = {}) {
		respondToClient(res, {
			body,
			contentType,
			headers,
			statusCode
		});
	}
}
