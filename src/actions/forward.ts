/**
 * Date: 10/29/19
 * Time: 8:32 PM
 * @license MIT (see project's LICENSE file)
 */

import axios, {AxiosResponse, Method} from "axios";
import {Request} from "express";
import * as _ from "lodash";
import {HttpHeaders, HttpMethod, HttpResponse} from "../types";
import validate from "../validate";
import {requestToProxyDataSet} from "./_codec";

export async function forwardRequest(req: Request, forward: {
	headers?: HttpHeaders,
	method: HttpMethod
	url: string
}): Promise<HttpResponse> {
	return axios.request({
		data: requestToProxyDataSet(req),
		headers: forward.headers,
		method: forward.method as Method,
		responseType: "json",
		url: forward.url
	})
		.then((axiosResponse: AxiosResponse) => {
			// here we have a few concerns:
			// 1. it's an error. This means that something happened with the server to which we forwarded. Not much to do here.
			// 2. It's a JSON response in which case we assume it is an HttpResponse.
			// 3. Otherwise we respond with a bare bones HttpResponse
			if(axiosResponse.status >= 400) {
				const message = _.isEmpty(axiosResponse.data)
					? ""
					: `: ${String(axiosResponse.data)}`;
				throw new Error(`${axiosResponse.statusText} ${(axiosResponse.status)}${message}`);
			} else {
				try {
					// the policy for the return is either to accept a fully described <code>HttpResponse</code>. If it
					// does pass validation as such then we assume that the response is intended to be the body.
					validate.validateData("./res/schemas/schema-library.json#/stub/response", axiosResponse.data);
					return axiosResponse.data as HttpResponse;
				} catch(error) {
					return {
						body: axiosResponse.data
					};
				}
			}
		});
}
