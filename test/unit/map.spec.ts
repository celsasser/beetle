/**
 * Date: 11/9/19
 * Time: 12:34 PM
 * @license MIT (see project's LICENSE file)
 */

import {createUrn} from "../../src/core/urn";
import map from "../../src/map";
import {UrnTypeId} from "../../src/types";
import {createControllerAction, createProxyActionLog} from "../factory";

describe("getActionsByStubId", function() {
	it("should properly get mapped actions to a stub-id", function() {
		const stubId = createUrn(UrnTypeId.STUB);
		const action = createProxyActionLog();
		map.stubIdToActions.set(stubId, [action]);
		expect(map.getActionsByStubId(stubId)).toEqual([action]);
	});

	it("should throw an exception if id does not exist", function() {
		const stubId = createUrn(UrnTypeId.STUB);
		expect(map.getActionsByStubId.bind(map, stubId))
			.toThrow(`could not find actions for ${stubId}`);
	});
});

describe("getControllerByRoute", function() {
	it("should properly get a mapped controller by route-id", function() {
		const routeId = createUrn(UrnTypeId.ROUTE);
		const controller = createControllerAction();
		map.routeIdToController.set(routeId, controller);
		expect(map.getControllerByRoute(routeId)).toEqual(controller);
	});

	it("should throw an exception if id does not exist", function() {
		const routeId = createUrn(UrnTypeId.ROUTE);
		expect(map.getControllerByRoute.bind(map, routeId))
			.toThrow(`could not find route for ${routeId}`);
	});
});

describe("getRouteIdByStubId", function() {
	it("should properly get a mapped route-id by stub-id", function() {
		const routeId = createUrn(UrnTypeId.ROUTE);
		const stubId = createUrn(UrnTypeId.STUB);
		map.stubIdToRouteId.set(stubId, routeId);
		expect(map.getRouteIdByStubId(stubId)).toEqual(routeId);
	});

	it("should throw an exception if id does not exist", function() {
		const stubId = createUrn(UrnTypeId.STUB);
		expect(map.getRouteIdByStubId.bind(map, stubId))
			.toThrow(`could not find route for ${stubId}`);
	});
});
