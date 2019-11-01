/**
 * Date: 10/29/19
 * Time: 8:28 PM
 * @license MIT (see project's LICENSE file)
 */

/**
 * Describes what should be performed when proxying
 */
export enum ProxyAction {
	FORWARD = "forward",
	LOG = "log"
}

export enum ProxyMethod {
	ALL = "all",
	GET = "get",
	POST = "post",
	PUT = "put",
	DELETE = "delete",
	PATCH = "patch",
	OPTIONS = "options",
	HEAD = "head",
}

/**
 * Describes the protocol we should use when setting up the proxy server
 */
export enum ProxyProtocol {
	HTTP = "http",
	HTTPS = "https"
}

/**
 * Describes a single proxy configuration
 */
export interface ProxyConfiguration {
	id: string;
	action: {
		/**
		 * Used by routes that log. If not specified then we default it.
		 */
		response: ProxyResponse;
		type: ProxyAction;
	};
	proxy: {
		method: ProxyMethod;
		path: string;
		protocol: ProxyProtocol;
	}
}

/**
 * Response description
 */
export interface ProxyResponse {
	body?: object;
	contentType?: string;
	headers?: {[key: string]: string};
	statusCode?: number;
}

/**
 * Proxy server properties
 */
export interface ProxyServer {
	port: number;
	protocol: ProxyProtocol;
}

/**
 * Initial setup of the proxy server
 */
export interface ProxySetup {
	server: ProxyServer;
	proxies?: ProxyConfiguration[]
}

