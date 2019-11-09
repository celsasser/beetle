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
 * Describes a route's properties
 */
export interface ProxyRoute {
	method: HttpMethod;
	path: string;
	/**
	 * We track protocol here for convenience
	 */
	protocol: ServerProtocol;
}

/**
 * Describes a single route cfg
 */
export interface ProxyStub {
	actions: ProxyAction[];
	/**
	 * An id that may be used to manage this stubs existence
	 */
	id: string;
	route: ProxyRoute;
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
 * Initial setup of the route server
 */
export interface ProxySetup {
	stubs?: ProxyStub[];
	server: ServerProperties;
}

