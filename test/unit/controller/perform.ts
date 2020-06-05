/**
 * Date: 11/18/19
 * Time: 9:08 PM
 * @license MIT (see project's LICENSE file)
 */
import {Request, Response} from "express";
import {ControllerBase} from "../../../src/controller/base";
import {HttpResponse} from "../../../src/types";
import {createRequest, createResponse} from "../../factory";

export function performRouteHandlerTest({
	controller,
	expected,
	req = createRequest(),
	res = createResponse()
}: {
	controller: ControllerBase,
	expected: HttpResponse,
	req?: Request,
	res?: jest.Mocked<Response>
}): Promise<void> {
	return new Promise((resolve, reject) => {
		controller.handler(req, res, function(error: any) {
			try {
				expect(error).toBeUndefined();
				if(expected.contentType) {
					expect(res.contentType).toBeCalledWith(expected.contentType);
				} else {
					expect(res.contentType).toBeCalledTimes(0);
				}
				res.header.mock.calls.forEach(([name, value]) => {
					// @ts-ignore
					expect(expected.headers[name]).toEqual(value);
				});
				if(expected.statusCode) {
					expect(res.status).toBeCalledWith(expected.statusCode);
				} else {
					expect(res.contentType).toBeCalledTimes(0);
				}
				expect(res.send).toBeCalledWith(expected.body);
				resolve();
			} catch(error) {
				reject(error);
			}
		});
	});

}
