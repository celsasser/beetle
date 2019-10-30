/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

const _ = require("lodash");

/**
 * @param {Response} res
 * @param {string} body
 * @param {string} contentType
 * @param {Object} headers
 * @param {number} statusCode
 */
function respondToClient(res, {
	body = undefined,
	contentType = undefined,
	headers = undefined,
	statusCode = undefined
}) {
	if(contentType) {
		res.contentType(contentType);
	}
	_.forEach(headers, (value, key) => {
		res.header(key, value);
	});
	if(statusCode) {
		res.status(statusCode);
	}
	res.send(body);
}


module.exports = {
	respondToClient
};
