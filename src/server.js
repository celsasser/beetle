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

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const {
	addListener,
	removeListener
} = require("./routes/listen");

class Server {
	constructor({
		port = 8989
	}) {
		this.port = port;
		this.express = express();
		this.router = new express.Router();
		this._configureExpress();
		this._setupListenerRoutes();
	}

	addListenRoute({
		method,
		path
	}) {

	}

	removeListenRoute({
		method,
		path
	}) {

	}

	addProxyRoute({

	}) {

	}

	start() {
		const server = http.createServer(this.express);
		server.on("error", (error)=> {
			console.error(`Server: attempt to start server on port ${this.port} failed: ${error}`);
		});
		server.listen(this.port, ()=> {
			console.info(`Server: express server listening on port ${this.port}`);
		});
	}

	_configureExpress() {
		this.express.set("port", this.port);
		this.express.use(bodyParser.urlencoded({extended: false}));
		this.express.use("/", this.express);
	}

	_setupListenerRoutes() {
		this.router.post("/proxy", addListener);
		this.router.post("/proxy", removeListener);
	}
}
