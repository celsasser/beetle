/**
 * Date: 11/2/19
 * Time: 12:57 AM
 * @license MIT (see project's LICENSE file)
 */

import {loadProxySetupByPath} from "../../src/setup";

describe("loadSetup", function() {
	it("should load our defaults if no setup path is specified", function() {
		const setup = loadProxySetupByPath();
		expect(setup).toEqual(require("./output/loadSetupDefaults"));
	});

	it("should override with details if setup path is specified", function() {
		const setup = loadProxySetupByPath(`${__dirname}/input/loadSetup.json`);
		expect(setup).toEqual(require("./output/loadSetup"));
	});
});

