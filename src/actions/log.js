/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

const {encodeRequest} = require("./_codec");
const {respondToClient} = require("./_respond");

/**
 * @param {ProxyConfiguration} cfg
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Object>}
 */
async function logRequest(cfg, req, res) {
	const encoded = encodeRequest(cfg, req);
	console.log(`Proxying: ${encoded}`);
	respondToClient(res, cfg.action.response);
}

module.exports = {
	logRequest
};
