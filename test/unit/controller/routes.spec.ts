/**
 * Date: 11/24/19
 * Time: 9:59 PM
 * @license MIT (see project's LICENSE file)
 */
import {ControllerGetRouteConfiguration} from "../../../src/controller/routes";
import {getCurrentRouteConfiguration} from "../../../src/routing";
import {CONTROLLER_DEFAULTS} from "../../factory";
import {performRouteHandlerTest} from "./perform";

describe("ControllerGetRouteConfiguration", function() {
	function createInstance() {
		return new ControllerGetRouteConfiguration(
			CONTROLLER_DEFAULTS.server,
			CONTROLLER_DEFAULTS.method,
			CONTROLLER_DEFAULTS.path
		);
	}

	describe("constructor", function() {
		it("should properly populate response members", function() {
			const instance = createInstance();
			expect(instance.method).toEqual(CONTROLLER_DEFAULTS.method);
			expect(instance.path).toEqual(CONTROLLER_DEFAULTS.path);
			expect(instance.purpose).toEqual("Explore Routes");
			expect(instance.server).toEqual(CONTROLLER_DEFAULTS.server);
		});
	});

	describe("handler", function() {
		it("should properly send the response as per instance's construction", async function() {
			const controller = createInstance();
			const descriptions = getCurrentRouteConfiguration();
			return performRouteHandlerTest({
				controller,
				expected: {
					body: descriptions,
					contentType: "application/json",
					statusCode: 200
				}
			});
		});
	});
});
