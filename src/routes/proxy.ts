/**
 * Copyright (c) 2019 Home Box Office, Inc. as an unpublished
 * work. Neither this material nor any portion hereof may be copied or
 * distributed without the express written consent of Home Box Office, Inc.
 *
 * This material also contains proprietary and confidential information
 * of Home Box Office, Inc. and its suppliers, and may not be used by or
 * disclosed to any person, in whole or in part, without the prior written
 * consent of Home Box Office, Inc.
 */

import {
	Request,
	Response
} from "express";
import * as actions from "../actions";
import {
	ProxyAction,
	ProxyConfiguration
} from "../types/proxy";
import {formatProxySummary} from "../utils";

/**
 * @param {ProxyConfiguration} cfg
 * @param {Request} req
 * @param {Response} res
 */
export function proxy(cfg: ProxyConfiguration, req: Request, res: Response) {
	const handler = (cfg.action.type === ProxyAction.FORWARD)
		? actions.forwardRequest
		: actions.logRequest;
	handler(cfg, req, res)
		.catch(error => {
			console.error(`Attempt to proxy ${formatProxySummary(cfg)} failed: ${error}`);
		});
}
