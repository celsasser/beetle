/**
 * Date: 10/29/19
 * Time: 9:50 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";
import {formatJSON} from "../core/utils";

export function encodeRequest(req: Request): string {
	return formatJSON({
		body: req.body,
		headers: req.body,
		method: req.method,
		path: req.path,
		query: req.query
	});
}
