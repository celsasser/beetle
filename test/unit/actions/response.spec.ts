/**
 * Date: 11/24/19
 * Time: 7:34 PM
 * @license MIT (see project's LICENSE file)
 */

import {respondToClient} from "../../../src/actions";
import {createResponse} from "../../factory";

describe("respondToClient", function() {
	it("should properly setup the response and send it", function() {
		const res = createResponse();
		const data = require("./input/respondResponseData.json");
		respondToClient(res, data);
		expect(res.contentType).toBeCalledWith(data.contentType);
		expect(res.header).toBeCalledWith("X-Property", data.headers["X-Property"]);
		expect(res.status).toBeCalledWith(data.statusCode);
		expect(res.send).toBeCalledWith(data.body);
	});
});
