/**
 * Copyright (c) 2019 Home Box Office, Inc. as an unpublished
 * work. Neither this material nor any portion hereof may be copied or
 * distributed without the express written consent of Home Box Office, Inc.
 *
 * This material also contains proprietary and confidential information
 * of Home Box Office, Inc. and its suppliers, and may not be used by or
 * disclosed to any person, in whole or in part, without the prior written
 * consent of Home Box Office, Inc.
 */

import * as bodyParser from "body-parser";
import * as express from "express";
import * as morgan from "morgan";
import {ServerProtocol} from "./types/server";

/**
 * Our server instance through which we listen for proxy configurations
 */
export class Server {
	public readonly express: express.Express;
	public readonly port: number;
	public readonly protocol: ServerProtocol;
	/**
	 * Publicly exposed router through which all proxy traffic may be added
	 */
	public readonly router: express.Router;

	constructor({
		port = 8989,
		protocol = ServerProtocol.HTTP
	}) {
		this.port = port;
		this.protocol = protocol;
		this.express = express();
		this.router = express.Router();
		this._configureExpress();
	}

	/**
	 * Start the machine up
	 */
	public start(): Promise<void> {
		const protocol = (this.protocol === ServerProtocol.HTTP)
			? require("http")
			: require("https");
		const server = protocol.createServer(this.express);
		return new Promise((resolve, reject) => {
			server.on("error", (error: Error) => {
				console.error(`Server.start(): attempt to start server on port ${this.port} failed: ${error}`);
				reject(error);
			});
			server.listen(this.port, () => {
				console.info(`Server.start(): listening on ${this.protocol}://localhost:${this.port}`);
				resolve();
			});
		});
	}

	/*********************
	 * Private Interface
	 **********************/
	private _configureExpress() {
		this.express.set("port", this.port);
		this.express.use(bodyParser.urlencoded({extended: false}));
		this.express.use(morgan('[:date[iso]] ":method :url HTTP/:http-version" status=:status length=:res[content-length] remote=:remote-addr agent=":user-agent"'));
		this.express.use("/", this.router);
	}
}
