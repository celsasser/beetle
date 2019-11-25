/**
 * Date: 11/24/19
 * Time: 7:34 PM
 * @license MIT (see project's LICENSE file)
 */

import axios from "axios";
import {forwardRequest} from "../../../src/actions";
import {createRequest} from "../../factory";

jest.mock("axios");

const axiosMock = axios as jest.Mocked<typeof axios>;

describe("forwardRequest", function() {
	it("should properly forward the request and treat response as body if it doesn't match HttpResponse schema", async function() {
		const req = createRequest();
		axiosMock.request.mockResolvedValue({
			data: "result"
		});
		return forwardRequest(req, require("./input/forwardRequest.json"))
			.then(result => {
				expect(axios.request)
					.toBeCalledWith(require("./expectations/forwardRequestInput.json"));
				expect(result).toEqual({
					body: "result"
				});
			});
	});

	it("should forward the request and treat response as HttpResponse if it conforms with schema", function() {
		const req = createRequest();
		axiosMock.request.mockResolvedValue(require("./input/forwardHttpResponse.json"));
		return forwardRequest(req, require("./input/forwardRequest.json"))
			.then(result => {
				expect(axios.request)
					.toBeCalledWith(require("./expectations/forwardRequestInput.json"));
				expect(result).toEqual(require("./expectations/forwardHttpResponse.json"));
			});
	});
});
