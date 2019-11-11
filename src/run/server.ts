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
	ControllerStubAdd,
	ControllerStubRemove
} from "../controller/stub";
import {addController} from "../routing";
import {Server} from "../server";
import {
	addProxySetup,
	loadProxySetupByPath
} from "../setup";
import {
	CLIProxyServerParams,
	HttpMethod
} from "../types";

/**
 * Configures our API
 * @param server
 */
function setupAPI(server: Server): void {
	addController(new ControllerStubAdd(server, HttpMethod.POST, "proxy/add"));
	addController(new ControllerStubRemove(server, HttpMethod.DELETE, "proxy/remove"));
}

export default async function run(params: CLIProxyServerParams): Promise<void> {
	const setup = loadProxySetupByPath(params.setupPath);
	const server = new Server(setup.server);
	setupAPI(server);
	return server.start()
		.then(addProxySetup.bind(null, setup, server));
}

