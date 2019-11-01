/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

import {
	Request,
	Response
} from "express";
import {ProxyConfiguration} from "../types/proxy";
import {encodeRequest}  from "./_codec";

export async function forwardRequest(cfg: ProxyConfiguration, req: Request, res: Response): Promise<void> {
	const encoded = encodeRequest(cfg, req);

}
