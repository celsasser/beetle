/**
 * Date: 11/2/19
 * Time: 12:57 AM
 * @license MIT (see project's LICENSE file)
 */

import {
	addProxyConfiguration,
	addProxySetup,
	loadSetup
} from "../../src/setup";


describe("loadSetup", function() {
	it("should load our defaults if no setup path is specified", function() {
		const setup = loadSetup();
		expect(setup).toEqual(require("./output/loadSetupDefaults.json"));
	});

	it("should override with details if setup path is specified", function() {
		const setup = loadSetup(`${__dirname}/input/loadSetup.json`);
		expect(setup).toEqual(require("./output/loadSetup.json"));
	});
});

