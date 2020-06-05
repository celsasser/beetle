/**
 * Date: 06/06/19
 * Time: 7:17 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";
import {HttpResponse} from "../types";
import {requestToProxyDataSet} from "./_codec";

export async function reflectRequest(req: Request): Promise<HttpResponse> {
	return {
		body: requestToProxyDataSet(req)
	};
}
