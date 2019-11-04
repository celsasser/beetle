/**
 * Date: 11/2/19
 * Time: 7:48 PM
 * @license MIT (see project's LICENSE file)
 */
import {
	NextFunction,
	Request,
	Response
} from "express";
import {Server} from "../server";
import {HttpMethod} from "../types/server";


export abstract class ControllerBase {
	public readonly method: HttpMethod;
	public readonly path: string;
	public readonly server: Server;

	public constructor(server: Server, method: HttpMethod, path: string) {
		this.method = method;
		this.path = path;
		this.server = server;
	}

	public abstract route(req: Request, res: Response, next?: NextFunction): void;
}
