/**
 * Date: 11/25/19
 * Time: 9:36 PM
 * @license MIT (see project's LICENSE file)
 */

import environment from "../../src/environment";

describe("Environment", function() {
	it("should properly setup defaults", function() {
		expect(environment.debug).toEqual(false);
		expect(environment.verbose).toEqual(false);
	});

	describe("get", function() {
		it("should properly return all properties", function() {
			environment.set({
				debug: false,
				verbose: true
			});
			expect(environment.get()).toEqual({
				debug: false,
				verbose: true
			});
		});
	});

	describe("set", function() {
		it("should properly set all settable properties", function() {
			environment.set({
				debug: true,
				verbose: true
			});
			expect(environment.debug).toEqual(true);
			expect(environment.verbose).toEqual(true);
		});
	});
});
