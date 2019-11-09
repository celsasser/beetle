/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";
import {ProxyResponse} from "../types/proxy";
import {encodeRequest} from "./_codec";

export async function logRequest(req: Request): Promise<ProxyResponse> {
	const encoded = encodeRequest(req);
	console.log(`Proxying: ${encoded}`);
	return Promise.resolve({});
}
