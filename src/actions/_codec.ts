/**
 * Date: 10/29/19
 * Time: 9:50 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";
import {HttpHeaders, HttpMethod, ProxyDataSet} from "../types";

/**
 * encodes and formats a request as a string. Formats for presentation
 * which means that it uses spaces vs. tabs.
 */
export function requestToProxyDataSet(req: Request): ProxyDataSet {
	return {
		body: req.body,
		headers: req.headers as HttpHeaders,
		method: req.method as HttpMethod,
		params: req.params,
		path: req.path,
		query: req.query
	};
}
