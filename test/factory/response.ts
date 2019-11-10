/**
 * Date: 11/9/19
 * Time: 1:39 AM
 * @license MIT (see project's LICENSE file)
 */
import {Response} from "express";

class ResponseApproximation {
	contentType(type: string): ResponseApproximation {
		return this;
	}

	header(name:string, value: any): ResponseApproximation {
		return this;
	}

	json(body: any): ResponseApproximation {
		return this;
	}

	send(body: any): ResponseApproximation {
		return this;
	}

	status(code: number): ResponseApproximation {
		return this;
	}
}

export function createResponse(): jest.Mocked<Response> {
	let response = new ResponseApproximation();
	response.contentType = jest.fn(() => response);
	response.header = jest.fn(() => response);
	response.json = jest.fn(() => response);
	response.send = jest.fn(() => response);
	response.status = jest.fn(() => response);
	return response as jest.Mocked<Response>;
}
