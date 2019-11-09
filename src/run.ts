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

import {
	ControllerProxyAdd,
	ControllerProxyRemove
} from "./controller/proxy";
import {addController} from "./routing";
import {Server} from "./server";
import {
	addProxySetup,
	loadSetup
} from "./setup";
import {
	CliProperties,
	HttpMethod
} from "./types";

/**
 * Configures our API
 * @param server
 */
function setupAPI(server: Server): void {
	addController(new ControllerProxyAdd(server, HttpMethod.POST, "proxy/add"));
	addController(new ControllerProxyRemove(server, HttpMethod.DELETE, "proxy/remove"));
}

export default function run(params: CliProperties): Promise<void> {
	const setup = loadSetup(params.setupPath);
	const server = new Server(setup.server);
	setupAPI(server);
	return server.start()
		.then(addProxySetup.bind(null, setup, server));
}

