/**
 * Date: 10/29/19
 * Time: 9:50 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";
import {ProxyConfiguration} from "../types/proxy";
import {formatJSON} from "../utils";

export function encodeRequest(cfg: ProxyConfiguration, req: Request): string {
	return formatJSON({
		body: req.body,
		headers: req.body,
		id: cfg.id,
		method: req.method,
		path: req.path,
		query: req.query
	});
}
