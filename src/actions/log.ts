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
import {encodeRequest} from "./_codec";
import {respondToClient} from "./_respond";

export async function logRequest(cfg: ProxyConfiguration, req: Request, res: Response): Promise<void> {
	const encoded = encodeRequest(cfg, req);
	console.log(`Proxying: ${encoded}`);
	respondToClient(res, cfg.action.response/**/);
}
