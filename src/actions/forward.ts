/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

import axios, {AxiosResponse, Method} from "axios";
import {Request} from "express";
import * as log from "../core/log";
import {
	HttpHeaders,
	HttpMethod,
	HttpResponse
} from "../types";
import validate from "../validate";
import {encodeRequest} from "./_codec";

export async function forwardRequest(request: Request, forward: {
	headers?: HttpHeaders,
	method: HttpMethod
	url: string
}): Promise<HttpResponse> {
	const encoded = encodeRequest(request);
	return axios.request({
		data: encoded,
		headers: forward.headers,
		method: forward.method as Method,
		url: forward.url
	}).then((axiosResponse: AxiosResponse) => {
		const response = axiosResponse.data as HttpResponse;
		try {
			validate.validateData("./res/schemas/schema-library.json#/stub/response", response);
		} catch(error) {
			log.error("action.forwardRequest(): response schema failed validation", {
				error: error.message,
				forward,
				response
			});
		}
		return response;

	});
}
