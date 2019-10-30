/**
 * Date: 10/29/19
 * Time: 9:50 PM
 * @license MIT (see project's LICENSE file)
 */

const {formatJSON} = require("../utils");

/**
 * @param {ProxyConfiguration} cfg
 * @param {Request} req
 * @returns {string}
 */
function encodeRequest(cfg, req) {
	return formatJSON({
		id: cfg.id,
		body: req.body,
		headers: req.body,
		method: req.method,
		path: req.path,
		query: req.query
	});
}


module.exports = {
	encodeRequest
};
