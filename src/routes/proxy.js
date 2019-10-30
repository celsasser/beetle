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

/**
 * @param {ProxyConfiguration} cfg
 * @param {Request} req
 * @param {Response} res
 */
function proxy(cfg, req, res) {
	if(cfg.action.type === "forward") {
		actions.forwardRequest(cfg, req, res);
	} else {
		actions.logRequest(cfg, req, res);
	}
}

module.exports = {
	proxy
};
