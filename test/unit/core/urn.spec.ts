/**
 * Date: 11/3/19
 * Time: 8:39 PM
 * @license MIT (see project's LICENSE file)
 */

import {createUrn} from "../../../src/core/urn";
import {UrnTypeId} from "../../../src/types";

describe("createUrn", function() {
	it("should properly create urn of specified type", function() {
		const result = createUrn(UrnTypeId.ROUTE);
		expect(result).toMatch(/^urn:beetle:route:[\w-]+$/);
	});
});
