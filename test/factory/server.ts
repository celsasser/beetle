/**
 * Date: 11/9/19
 * Time: 1:10 AM
 * @license MIT (see project's LICENSE file)
 */
import {Server} from "../../src/server";
import {
	ServerProperties,
	ServerProtocol
} from "../../src/types";

const DEFAULTS_SERVER = {
	port: 8080,
	protocol: ServerProtocol.HTTP
};

export function createServer(properties: ServerProperties = createServerProperties()) {
	return new Server(properties);
}

export function createServerProperties({
	port = DEFAULTS_SERVER.port,
	protocol = DEFAULTS_SERVER.protocol
}: ServerProperties = {}): ServerProperties {
	return {
		port,
		protocol
	};
}
