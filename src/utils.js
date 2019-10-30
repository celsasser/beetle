/**
 * Date: 10/29/19
 * Time: 9:46 PM
 * @license MIT (see project's LICENSE file)
 */

/**
 * @param {Object|undefined|null} object
 * @returns {string}
 */
function formatJSON(object) {
	return JSON.stringify(object, null, "   ");
}

/**
 * Puts the proxy's defining characteristics into a string
 * @param {ProxyConfiguration} cfg
 * @return {string}
 */
function formatProxySummary(cfg) {
	return `${cfg.proxy.method.toUpperCase()} ${cfg.proxy.protocol}:/${cfg.proxy.path}`
}


module.exports = {
	formatJSON,
	formatProxySummary
};
