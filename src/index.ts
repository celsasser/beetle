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

import {parseCommandLine} from "./cli";
import {
	loadSetup,
	processProxySetup
} from "./setup";
import {Server}  from "./server";
import {ProxySetup} from "./types/proxy";


/**
 * Starts up our proxy server as per our setup spec
 */
function startServer(setup: ProxySetup) {
	const server = new Server(setup.server);
	server.start()
		.then(processProxySetup.bind(null, setup, server));
}

try {
	const params = parseCommandLine();
	const setup = loadSetup(params.setupPath);
	startServer(setup);
} catch(error) {
	console.error(`Attempt to startup failed: ${error.message}`);
	console.log("Usage: node index.js <configuration-path>");
}
