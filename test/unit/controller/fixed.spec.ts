/**
 * Date: 11/18/19
 * Time: 9:46 PM
 * @license MIT (see project's LICENSE file)
 */
import {ControllerFixedResponse} from "../../../src/controller/fixed";
import {HttpResponse} from "../../../src/types";
import {CONTROLLER_DEFAULTS} from "../../factory";
import {performRouteHandlerTest} from "./perform";

describe("ControllerFixedResponse", function() {
	function createInstance(resData: HttpResponse = require("./input/fixedTestResponse")) {
		return new ControllerFixedResponse({
			method: CONTROLLER_DEFAULTS.method,
			path: CONTROLLER_DEFAULTS.path,
			purpose: "Purpose",
			resData,
			server: CONTROLLER_DEFAULTS.server
		});
	}

	describe("constructor", function() {
		it("should properly populate response members", function() {
			const data = require("./input/fixedTestResponse");
			const instance = createInstance();
			expect(instance.resData).toEqual(data);
			expect(instance.method).toEqual(CONTROLLER_DEFAULTS.method);
			expect(instance.path).toEqual(CONTROLLER_DEFAULTS.path);
			expect(instance.purpose).toEqual("Purpose");
			expect(instance.server).toEqual(CONTROLLER_DEFAULTS.server);
		});
	});

	describe("handler", function() {
		it("should properly send the response as per instance's construction", async function() {
			const controller = createInstance();
			return performRouteHandlerTest({
				controller,
				expected: controller.resData
			});
		});
	});
});
