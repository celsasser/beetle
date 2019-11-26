/**
 * Date: 11/25/19
 * Time: 9:48 PM
 * @license MIT (see project's LICENSE file)
 */

import {readFileSync} from "fs-extra";
import * as log from "../../src/core/log";
import {dumpRouteConfiguration} from "../../src/dump";

jest.mock("../../src/core/log");

describe("dumpRouteConfiguration", function() {
	it("should properly write to log.info", function() {
		const expected = readFileSync(`${__dirname}/output/dumpRoutes.txt`, {encoding: "utf8"});
		dumpRouteConfiguration(require("./input/dumpRoutes.json"));
		expect(log.info).toBeCalledWith(expected.trim());
	});
});
