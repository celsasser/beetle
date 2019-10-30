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

const express = require("express");
const bodyParser = require("body-parser");
const route = require("./routes/proxy");
const {formatJSON} = require("./utils");

/**
 * Our server instance through which we listen for proxy configurations
 */
class Server {
	constructor({
		port = 8989,
		protocol = "http"
	}) {
		this.port = port;
		this.protocol = protocol;
		this.express = express();
		this.router = new express.Router();
		this._configureExpress();
	}

	/**
	 * @param {ProxyConfiguration} configuration
	 */
	addProxyConfiguration(configuration) {
		try {
			const handler = route.proxy.bind(null, configuration);
			const method = configuration.proxy.method.toLowerCase();
			this.router[method](configuration.proxy.path, handler);
		} catch(error) {
			throw new Error(`failed to setup proxy for ${formatJSON(configuration)}\n${error.message}`)
		}
	}

	/**
	 * Start the machine up
	 * @returns {Promise<void>}
	 */
	start() {
		const protocol = (this.protocol === "http")
			? require("http")
			: require("https");
		const server = protocol.createServer(this.express);
		return new Promise((resolve, reject) => {
			server.on("error", (error) => {
				console.error(`Server: attempt to start server on port ${this.port} failed: ${error}`);
				reject(error);
			});
			server.listen(this.port, () => {
				console.info(`Server: express server listening on port ${this.port}`);
				resolve();
			});
		});
	}

	/*********************
	 * Private Interface
	 **********************/
	_configureExpress() {
		this.express.set("port", this.port);
		this.express.use(bodyParser.urlencoded({extended: false}));
		this.express.use("/", this.router);
	}
}

module.exports = {
	Server
};
