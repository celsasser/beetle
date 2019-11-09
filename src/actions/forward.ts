/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";
import {ProxyResponse} from "../types/proxy";
import {HttpMethod} from "../types/server";
import {encodeRequest} from "./_codec";

export async function forwardRequest({method, req, url}: {
	method: HttpMethod
	req: Request,
	url: string
}): Promise<ProxyResponse> {
	const encoded = encodeRequest(req);
	// todo:
	return Promise.resolve({});

}
