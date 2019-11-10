/**
 * Date: 11/9/19
 * Time: 1:39 AM
 * @license MIT (see project's LICENSE file)
 */
import {Response} from "express";

class MockResponse {
	contentType(type: string): MockResponse {
		return this;
	}

	json(body: any): MockResponse {
		return this;
	}

	send(body: any): MockResponse {
		return this;
	}

	status(code: number): MockResponse {
		return this;
	}
}

export function createResponse(): Response {
	let response = new MockResponse();
	response.contentType = jest.fn(() => response);
	response.json = jest.fn(() => response);
	response.send = jest.fn(() => response);
	response.status = jest.fn(() => response);
	return response as unknown as Response;
}
