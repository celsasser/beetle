/**
 * Date: 10/29/19
 * Time: 8:28 PM
 * @license MIT (see project's LICENSE file)
 */

import {
	HttpHeaders,
	HttpMethod,
	HttpParams,
	HttpResponse,
	ServerProperties,
	ServerProtocol
} from "./server";

/**
 * Describes what should be performed when proxying
 */
export enum ProxyActionType {
	FORWARD = "forward",
	LOG = "log",
	REFLECT = "reflect",
	RESPOND = "respond"
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
	headers?: HttpHeaders;
	method: HttpMethod;
	url: string;
}

export interface ProxyActionLog extends ProxyActionBase {
}

export interface ProxyActionReflect extends ProxyActionBase {
}

export interface ProxyActionRespond extends ProxyActionBase {
	response: HttpResponse;
}

export type ProxyAction = ProxyActionForward|ProxyActionLog|ProxyActionRespond;

export interface ProxyDataSet {
	body?: any;
	headers?: HttpHeaders;
	method: HttpMethod;
	params: HttpParams;
	path: string;
	query: any;
}

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
 * Initial setup of the route server
 */
export interface ProxySetup {
	stubs?: ProxyStub[];
	server: ServerProperties;
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
 * Metadata that describes one or more route's properties
 */
export interface MetaProxyRoute {
	method: HttpMethod|HttpMethod[];
	path: string;
	/**
	 * We track protocol here for convenience
	 */
	protocol: ServerProtocol;
}

/**
 * Metadata that describes one or more routes configuration
 */
export interface MetaProxyStub {
	actions: ProxyAction[];
	/**
	 * An id that may be used to manage this stubs existence
	 */
	id: string;
	route: MetaProxyRoute;
}

