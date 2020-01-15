/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

import {Response} from "express";
import * as _ from "lodash";
import {HttpResponse} from "../types";

export function respondToClient(res: Response, data: HttpResponse): void {
	if(data.contentType) {
		res.contentType(data.contentType);
	}
	_.forEach(data.headers, (value, key) => {
		res.header(key, value);
	});
	if(data.statusCode !== undefined) {
		res.status(data.statusCode);
	}
	res.send(data.body);
}
