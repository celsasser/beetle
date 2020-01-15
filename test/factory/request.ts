/**
 * Date: 11/9/19
 * Time: 1:39 AM
 * @license MIT (see project's LICENSE file)
 */

import {Request} from "express";

const REQUEST_DEFAULTS = {
	body: {
		property: "body-value"
	},
	headers: {
		"X-Property": "header-value"
	},
	params: {},
	query: {}
};

export function createRequest({
	body = REQUEST_DEFAULTS.body,
	headers = REQUEST_DEFAULTS.headers,
	params = REQUEST_DEFAULTS.params,
	query = REQUEST_DEFAULTS.query
}: Partial<Request> = {}): Request {
	return {
		body,
		headers,
		params,
		query
	} as Request;
}
