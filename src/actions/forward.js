/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

const {encodeRequest} = require("./_codec");

/**
 * @param {ProxyConfiguration} cfg
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 */
async function forwardRequest(cfg, req, res) {
	const encoded = encodeRequest(cfg, req);

}


module.exports = {
	forwardRequest
};
