/**
 * Date: 10/29/19
 * Time: 8:28 PM
 * @license MIT (see project's LICENSE file)
 */


/**
 * @typedef {Object} ProxyResponse
 * @property {Object|undefined} body
 * @property {number} code
 * @property {Object|undefined} headers
 */

/**
 * @typedef {Object} ProxyConfiguration
 * @property {string} id
 * @property {Object} action
 * @property {"log"|"forward"} action.type
 * @property {ProxyResponse|undefined} action.response
 * @property {Object} proxy
 * @property {string} proxy.method
 * @property {string} proxy.path
 */

/**
 * @typedef {Object} ProxySetup
 * @property {Object} server
 * @property {number} server.port
 * @property {ProxyConfiguration[]} proxies
 */
