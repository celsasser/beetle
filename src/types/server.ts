/**
 * Date: 10/29/19
 * Time: 8:28 PM
 * @license MIT (see project's LICENSE file)
 */

export enum HttpMethod {
	ALL = "all",
	DELETE = "delete",
	GET = "get",
	HEAD = "head",
	OPTIONS = "options",
	PATCH = "patch",
	POST = "post",
	PUT = "put",
}

export type HttpHeaders = {[key: string]: string};

/**
 * Response description
 */
export interface HttpResponse {
	body?: object;
	contentType?: string;
	headers?: HttpHeaders;
	statusCode?: number;
}

/**
 * Describes the protocol we should use when setting up the route server
 */
export enum ServerProtocol {
	HTTP = "http",
	HTTPS = "https"
}

/**
 * Proxy server properties
 */
export interface ServerProperties {
	port: number;
	protocol: ServerProtocol;
}

