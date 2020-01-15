/**
 * Date: 11/25/19
 * Time: 9:36 PM
 * @license MIT (see project's LICENSE file)
 */

import {readJSONSync} from "fs-extra";
import {loadConfigurationResource, loadDefaultResource} from "../../src/resources";

describe("loadConfigurationResource", function() {
	it("should properly resolve path and return file contents", function() {
		const loaded = loadConfigurationResource("setup-test-mock.json");
		const expected = readJSONSync("res/configurations/setup-test-mock.json");
		expect(loaded).toEqual(expected);
	});
});

describe("loadDefaultResource", function() {
	it("should properly resolve path and return file contents", function() {
		const loaded = loadDefaultResource("default-setup.json");
		const expected = readJSONSync("res/defaults/default-setup.json");
		expect(loaded).toEqual(expected);
	});
});
