/**
 * Date: 11/1/19
 * Time: 10:00 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import {ControllerFixedResponse} from "../controller/fixed";
import {ControllerGetRouteConfiguration} from "../controller/routes";
import {ControllerStubAdd, ControllerStubRemove} from "../controller/stub";
import {dumpRouteConfiguration} from "../dump";
import environment from "../environment";
import {loadDefaultResource} from "../resources";
import {addController, getCurrentRouteConfiguration} from "../routing";
import {Server} from "../server";
import {addProxySetup, loadProxySetupByPath} from "../setup";
import {CLIProxyServerParams, HttpMethod} from "../types";

/**
 * Configures our own API to support everything we want to be able to do
 * @param server
 */
function setupAPI(server: Server): void {
	addController(new ControllerFixedResponse({
		method: HttpMethod.GET,
		path: "/healthcheck",
		purpose: "Healthcheck",
		resData: loadDefaultResource("default-healthcheck.json"),
		server
	}));
	addController(new ControllerFixedResponse({
		method: HttpMethod.GET,
		path: "/information",
		purpose: "Build Information",
		server,
		// tslint:disable-next-line:object-literal-sort-keys
		resData: {
			body: Object.assign({},
				_.pick(require("../../package.json"), [
					"author",
					"description",
					"license",
					"name",
					"scripts",
					"version"
				]),
				environment.get())
		}
	}));
	addController(new ControllerStubAdd(server, HttpMethod.POST, "/proxy/add"));
	addController(new ControllerStubRemove(server, HttpMethod.DELETE, "/proxy/remove"));
	addController(new ControllerGetRouteConfiguration(server, HttpMethod.GET, "/routes"));
}

export default async function run(params: CLIProxyServerParams): Promise<void> {
	const setup = loadProxySetupByPath(params.setupPath);
	const server = new Server(setup.server);
	setupAPI(server);
	addProxySetup(server, setup);
	return server.start()
		.then(() => {
			dumpRouteConfiguration(getCurrentRouteConfiguration());
		});
}

