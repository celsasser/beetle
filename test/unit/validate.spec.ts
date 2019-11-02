/**
 * Date: 11/2/19
 * Time: 12:50 AM
 * @license MIT (see project's LICENSE file)
 */

import validate from "../../src/validate";

/**
 * Here we are going to make sure all of our schemas are valid
 */
describe("schemas", function() {
	[
		"./res/schemas/schema-configuration.json",
		"./res/schemas/schema-setup.json"
	].forEach(path => {
		it(`${path} should be a valid schema`, function() {
			validate.validateSchema(path);
		});
	});
});
