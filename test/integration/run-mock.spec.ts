/**
 * Date: 11/3/19
 * Time: 9:13 PM
 * @license MIT (see project's LICENSE file)
 */

import run from "../../src/run/server";
import {CLIProxyServerParams} from "../../src/types/cli";

describe("run test-mock", function() {
	it("should start the express server", function() {
		const params: CLIProxyServerParams = {
			setupPath: "./res/configurations/setup-test-mock.json"
		};
		return new Promise((resolve, reject) => {
			run(params)
				.catch(reject);
			// and now we just hang out
		});
	});
});
