/**
 * Date: 11/9/19
 * Time: 1:10 AM
 * @license MIT (see project's LICENSE file)
 */

import {
	HttpMethod,
	HttpResponse,
	ProxyActionForward,
	ProxyActionLog,
	ProxyActionRespond,
	ProxyActionType,
	ProxyRoute,
	ProxySetup,
	ProxyStub,
	ServerProtocol
} from "../../src/types";
import {createServer} from "./server";

export const PROXY_DEFAULTS = {
	path: "/proxy/route",
	responseBody: {
		type: "response"
	},
	responseContentType: "application/json",
	responseHeaders: {
		"X-Type": "response"
	},
	responseStatusCode: 200,
	stubId: "urn:stub:id"
};

export function createProxyActionForward({
	method = HttpMethod.GET,
	type = ProxyActionType.FORWARD,
	url = "http://host:9000/forward"
}: Partial<ProxyActionForward> = {}): ProxyActionForward {
	return {
		method,
		type,
		url
	};
}

export function createProxyActionLog({
	type = ProxyActionType.FORWARD
}: Partial<ProxyActionLog> = {}): ProxyActionLog {
	return {
		type
	};
}

export function createProxyActionResponse({
	response = createProxyResponse(),
	type = ProxyActionType.RESPOND
}: Partial<ProxyActionRespond> = {}): ProxyActionRespond {
	return {
		response,
		type
	};
}

export function createProxyResponse({
	body = PROXY_DEFAULTS.responseBody,
	contentType = PROXY_DEFAULTS.responseContentType,
	headers = PROXY_DEFAULTS.responseHeaders,
	statusCode = PROXY_DEFAULTS.responseStatusCode
}: Partial<HttpResponse> = {}): HttpResponse {
	return {
		body,
		contentType,
		headers,
		statusCode
	};
}

export function createProxyRoute({
	method = HttpMethod.GET,
	path = PROXY_DEFAULTS.path,
	protocol = ServerProtocol.HTTP
}: Partial<ProxyRoute> = {}): ProxyRoute {
	return {
		method,
		path,
		protocol
	};
}

export function createProxySetup({
	server = createServer(),
	stubs = [createProxyStub()]
}: Partial<ProxySetup> = {}): ProxySetup {
	return {
		server,
		stubs
	};
}

export function createProxyStub({
	actions = [createProxyActionResponse()],
	id = PROXY_DEFAULTS.stubId,
	route = createProxyRoute()
}: Partial<ProxyStub> = {}): ProxyStub {
	return {
		actions,
		id,
		route
	};
}
