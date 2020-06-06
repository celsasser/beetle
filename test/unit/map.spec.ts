/**
 * Date: 11/9/19
 * Time: 12:34 PM
 * @license MIT (see project's LICENSE file)
 */

import {createUrn} from "../../src/core/urn";
import beetleMap from "../../src/map";
import {UrnTypeId} from "../../src/types";
import {createControllerAction, createProxyActionLog} from "../factory";

describe("getActionsByStubId", function() {
	it("should properly get mapped actions to a stub-id", function() {
		const stubId = createUrn(UrnTypeId.STUB);
		const action = createProxyActionLog();
		beetleMap.stubIdToActions.set(stubId, [action]);
		expect(beetleMap.getActionsByStubId(stubId)).toEqual([action]);
	});

	it("should throw an exception if id does not exist", function() {
		const stubId = createUrn(UrnTypeId.STUB);
		expect(beetleMap.getActionsByStubId.bind(beetleMap, stubId))
			.toThrow(`could not find actions for ${stubId}`);
	});
});

describe("getControllerByRoute", function() {
	it("should properly get a mapped controller by route-id", function() {
		const routeId = createUrn(UrnTypeId.ROUTE);
		const controller = createControllerAction();
		beetleMap.routeIdToController.set(routeId, controller);
		expect(beetleMap.getControllerByRoute(routeId)).toEqual(controller);
	});

	it("should throw an exception if id does not exist", function() {
		const routeId = createUrn(UrnTypeId.ROUTE);
		expect(beetleMap.getControllerByRoute.bind(beetleMap, routeId))
			.toThrow(`could not find route for ${routeId}`);
	});
});

describe("getRouteIdByStubId", function() {
	it("should properly get a mapped route-id by stub-id", function() {
		const routeId = createUrn(UrnTypeId.ROUTE);
		const stubId = createUrn(UrnTypeId.STUB);
		beetleMap.stubIdToRouteId.set(stubId, routeId);
		expect(beetleMap.getRouteIdByStubId(stubId)).toEqual(routeId);
	});

	it("should throw an exception if id does not exist", function() {
		const stubId = createUrn(UrnTypeId.STUB);
		expect(beetleMap.getRouteIdByStubId.bind(beetleMap, stubId))
			.toThrow(`could not find route for ${stubId}`);
	});
});
