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

const actions = require("../actions");
const {formatProxySummary} = require("../utils");

/**
 * @param {ProxyConfiguration} cfg
 * @param {Request} req
 * @param {Response} res
 */
function proxy(cfg, req, res) {
	const handler = (cfg.action.type === "forward")
		? actions.forwardRequest
		: actions.logRequest;
	handler(cfg, req, res)
		.catch(error => {
			console.error(`Attempt to proxy ${formatProxySummary(cfg)} failed: ${error}`);
		});
}

module.exports = {
	proxy
};
