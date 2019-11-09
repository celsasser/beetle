/**
 * Date: 11/9/19
 * Time: 12:34 PM
 * @license MIT (see project's LICENSE file)
 */

import {createUrn} from "../../src/core/urn";
import map from "../../src/map";
import {UrnTypeId} from "../../src/types";
import {createProxyActionLog} from "../factory";

describe("getActionsByStubId", function() {
	it("should properly get mapped actions to a stub-id", function() {
		const stubId = createUrn(UrnTypeId.STUB);
		const action = createProxyActionLog();
		map.stubIdToActions.set(stubId, [action]);
		expect(map.getActionsByStubId(stubId)).toEqual([action]);
	});

	it("should throw an exception if id does not exist", function() {

	});
});

describe("getControllerByRoute", function() {

});

describe("getRouteIdByStubId", function() {

});
