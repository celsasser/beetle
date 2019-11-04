/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";
import {
	ProxyConfiguration,
	ProxyResponse
} from "../types/proxy";
import {HttpMethod} from "../types/server";
import {encodeRequest} from "./_codec";

export async function forwardRequest({cfg, method, req, url}: {
	cfg: ProxyConfiguration,
	method: HttpMethod
	req: Request,
	url: string
}): Promise<ProxyResponse> {
	const encoded = encodeRequest(cfg, req);
	// todo:
	return Promise.resolve({});

}
