/**
 * Date: 11/9/19
 * Time: 1:39 AM
 * @license MIT (see project's LICENSE file)
 */
import {Response} from "express";

class ResponseApproximation {
	public contentType(type: string): ResponseApproximation {
		return this;
	}

	public header(name: string, value: any): ResponseApproximation {
		return this;
	}

	public json(body: any): ResponseApproximation {
		return this;
	}

	public send(body: any): ResponseApproximation {
		return this;
	}

	public status(code: number): ResponseApproximation {
		return this;
	}
}

export function createResponse(): jest.Mocked<Response> {
	const response = new ResponseApproximation();
	response.contentType = jest.fn(() => response);
	response.header = jest.fn(() => response);
	response.json = jest.fn(() => response);
	response.send = jest.fn(() => response);
	response.status = jest.fn(() => response);
	return response as jest.Mocked<Response>;
}
