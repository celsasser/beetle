/**
 * Date: 11/9/19
 * Time: 12:52 PM
 * @license MIT (see project's LICENSE file)
 */

import validate from "../../src/validate";

describe("validate", function() {
	[
		{
			dataPath: "./res/configurations/setup-test.json",
			specPath: "./res/schemas/schema-setup.json"
		},
		{
			dataPath: "./res/defaults/default-setup.json",
			specPath: "./res/schemas/schema-setup.json"
		},
		{
			dataPath: "./res/defaults/default-stub-response.json",
			specPath: "./res/schemas/schema-stub-response.json"
		},
	].forEach(({dataPath, specPath})=> {
		it(`${dataPath} should conform with ${specPath}`, function() {
			validate.validateDataAtPath(specPath, dataPath);
		});
	});
});
