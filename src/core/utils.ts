/**
 * Date: 10/29/19
 * Time: 9:46 PM
 * @license MIT (see project's LICENSE file)
 */

import {ProxyRoute} from "../types/proxy";

/**
 * Converts JSON object into a string and formats.
 */
export function formatJSON(object: any): string {
	return JSON.stringify(object, null, "   ");
}

/**
 * Puts the route's defining characteristics into a string
 */
export function formatRouteSummary(route: ProxyRoute): string {
	return `${route.method.toUpperCase()} ${route.protocol}:/${route.path}`;
}
