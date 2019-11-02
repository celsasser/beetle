/**
 * Date: 10/29/19
 * Time: 9:46 PM
 * @license MIT (see project's LICENSE file)
 */

import {ProxyConfiguration} from "./types/proxy";

/**
 * Converts JSON object into a string and formats.
 */
export function formatJSON(object: any): string {
	return JSON.stringify(object, null, "   ");
}

/**
 * Puts the proxy's defining characteristics into a string
 */
export function formatProxySummary(cfg: ProxyConfiguration): string {
	return `${cfg.proxy.method.toUpperCase()} ${cfg.proxy.protocol}:/${cfg.proxy.path}`;
}
