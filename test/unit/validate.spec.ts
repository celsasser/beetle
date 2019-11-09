/**
 * Date: 11/2/19
 * Time: 12:50 AM
 * @license MIT (see project's LICENSE file)
 */

import * as klaw from "klaw-sync";
import validate from "../../src/validate";

/**
 * Here we are going to make sure all of our schemas are valid
 */
describe("schemas", function() {
	klaw("./res/schemas", {
		filter: item => item.path.endsWith(".json")
	})
		.forEach(item => {
			it(`${item.path} should be a valid schema`, function() {
				validate.validateSchema(item.path);
			});
		});
});
