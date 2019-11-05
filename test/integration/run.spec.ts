/**
 * Date: 11/3/19
 * Time: 9:13 PM
 * @license MIT (see project's LICENSE file)
 */

import run from "../../src/run";
import {CliProperties} from "../../src/types/cli";

describe("run", function() {
	it("should start the express server", function() {
		const params: CliProperties = {
			setupPath: "./res/configurations/hurley-libby.json"
		};
		return new Promise((resolve, reject) => {
			run(params)
				.catch(reject);
			// and now we just hang out
		});
	});
});
