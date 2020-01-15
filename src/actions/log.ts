/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";
import * as log from "../core/log";
import {formatRouteSummary} from "../core/utils";
import {HttpMethod, HttpResponse, ServerProtocol} from "../types";
import {requestToProxyDataSet} from "./_codec";

export async function logRequest(req: Request): Promise<HttpResponse> {
	const summary = formatRouteSummary({
		method: req.method as HttpMethod,
		path: req.path,
		protocol: req.protocol as ServerProtocol
	});
	log.info(summary, requestToProxyDataSet(req));
	return Promise.resolve({});
}
