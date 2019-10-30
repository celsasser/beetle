/**
 * Date: 10/29/19
 * Time: 8:28 PM
 * @license MIT (see project's LICENSE file)
 */


/**
 * @typedef {Object} ProxyConfiguration
 * @property {string} id
 * @property {Object} action
 * @property {"log"|"forward"} action.type
 * @property {Object} action.response
 * @property {Object|undefined} action.response.body
 * @property {string} action.response.contentType
 * @property {Object|undefined} action.response.headers
 * @property {number} action.response.statusCode
 * @property {Object} proxy
 * @property {string} proxy.method
 * @property {string} proxy.path
 * @property {string} proxy.protocol
 */

/**
 * @typedef {Object} ProxyServer
 * @property {number} port
 * @property {number} protocol
 */

/**
 * @typedef {Object} ProxySetup
 * @property {ProxyServer} server
 * @property {ProxyConfiguration[]} proxies
 */
