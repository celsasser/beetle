/**
 * Date: 10/29/19
 * Time: 8:28 PM
 * @license MIT (see project's LICENSE file)
 */

import {
	HttpMethod,
	ServerProperties,
	ServerProtocol
} from "./server";

/**
 * Describes what should be performed when proxying
 */
export enum ProxyActionType {
	FORWARD = "forward",
	LOG = "log",
	RESPONSE = "response"
}

/**
 * Base interface for all actions
 */
export interface ProxyActionBase {
	/**
	 * Is the action that should respond back to our client? A property we manage.
	 */
	responder?: boolean;
	type: ProxyActionType;
}

/**
 * Forwards to this target. If there is no ProxyActionRespond included then the response of this
 * call serves as the response to the client
 */
export interface ProxyActionForward extends ProxyActionBase {
	method: HttpMethod;
	url: string;
}

// tslint:disable-next-line: no-empty-interface
export interface ProxyActionLog extends ProxyActionBase {

}

export interface ProxyActionRespond extends ProxyActionBase {
	response: ProxyResponse;
}

export type ProxyAction = ProxyActionForward|ProxyActionLog|ProxyActionRespond;

/**
 * Describes a single proxy cfg
 */
export interface ProxyConfiguration {
	actions: ProxyAction[];
	id: string;
	proxy: {
		method: HttpMethod;
		path: string;
		/**
		 * We track protocol here for convenience
		 */
		protocol: ServerProtocol;
	};
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
 * Initial setup of the proxy server
 */
export interface ProxySetup {
	proxies?: ProxyConfiguration[];
	server: ServerProperties;
}

