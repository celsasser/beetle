/**
 * Copyright (c) 2018 Home Box Office, Inc. as an unpublished
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

const app_data_content = express();
const content_router = new express.Router();

app_data_content.use(bodyParser.json({limit: "5mb"}));
app_data_content.use(bodyParser.urlencoded({extended: false}));

/** configure: routes **/
// diagnostics
content_router.get("/healthcheck", ()=>{});

/** local API **/
function startup() {
	const server = http.createServer(app_data_content),
		port = 8989;
	app_data_content.set("port", port);
	server.on("error", function(error) {
		console.error(`Server: attempt to start ${name} server on port ${port} failed: ${error}`);
	});
	server.listen(port, function() {
		console.info(`Server: express server listening on port ${port}`);
	});
}
startup();
