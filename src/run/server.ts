/**
 * Date: 11/1/19
 * Time: 10:00 PM
 * @license MIT (see project's LICENSE file)
 */

import {
	ControllerStubAdd,
	ControllerStubRemove
} from "../controller/stub";
import {dumpRouteConfiguration} from "../dump";
import {addController, getCurrentRouteConfiguration} from "../routing";
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
		.then(() => {
			addProxySetup(setup, server);
			dumpRouteConfiguration(getCurrentRouteConfiguration());
		});
}

