/**
 * Date: 11/11/19
 * Time: 12:25 AM
 * @license MIT (see project's LICENSE file)
 */

import {format as formatUrl} from "url";
import * as log from "./core/log";
import {RouteProperties} from "./types/route";


export function dumpRouteConfiguration(routes: RouteProperties[]): void {
	const descriptions = routes.map(route => {
		const url = formatUrl({
			hostname: route.hostname,
			pathname: route.path,
			port: route.port,
			protocol: route.protocol
		});
		return `   ${route.purpose}: [${route.method.toUpperCase()}] ${url}`;
	});
	log.info(`Route configuration:\n${descriptions.join("\n")}`);
}
