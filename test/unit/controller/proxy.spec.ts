/**
 * Date: 11/10/19
 * Time: 12:02 AM
 * @license MIT (see project's LICENSE file)
 */

import map from "../../../src/map";
import {addProxyStub} from "../../../src/setup";
import * as factory from "../../factory";

describe("ControllerStubAdd", function() {
	describe("contructor", function() {
		it("should construct properly", function() {
			const instance = factory.createControllerProxyAdd();
			expect(instance.method).toEqual(factory.CONTROLLER_DEFAULTS.method);
			expect(instance.path).toEqual(factory.CONTROLLER_DEFAULTS.path);
			expect(instance.server).toEqual(factory.CONTROLLER_DEFAULTS.server);
		});
	});

	describe("handler", function() {
		it("should respond with error if request fails validation", function(done) {
			const instance = factory.createControllerProxyAdd();
			const req = factory.createRequest(require("./input/proxyAddRequestInvalid"));
			const res = factory.createResponse();
			instance.handler(req, res, (error) => {
				expect(error).not.toBeUndefined();
				done();
			});
		});

		it("should successfully add a single proxy configuration", function(done) {
			const instance = factory.createControllerProxyAdd();
			const input = require("./input/proxyAddRequestStub");
			const req = factory.createRequest(input);
			const res = factory.createResponse();
			instance.handler(req, res, (error) => {
				expect(error).toBeUndefined();
				expect(map.getRouteIdByStubId("urn:stub:id")).toEqual("urn:get:/test/route");
				expect(map.getActionsByStubId("urn:stub:id")).toEqual(input.body.actions);
				expect(res.send).toBeCalledTimes(1);
				done();
			});
		});

		it("should successfully add an array of proxy configurations", function(done) {
			const instance = factory.createControllerProxyAdd();
			const input = require("./input/proxyAddRequestStubs");
			const req = factory.createRequest(input);
			const res = factory.createResponse();
			instance.handler(req, res, (error) => {
				expect(error).toBeUndefined();
				expect(map.getRouteIdByStubId("urn:stub:id1")).toEqual("urn:get:/test/route1");
				expect(map.getRouteIdByStubId("urn:stub:id2")).toEqual("urn:get:/test/route2");
				expect(map.getActionsByStubId("urn:stub:id1")).toEqual(input.body[0].actions);
				expect(map.getActionsByStubId("urn:stub:id2")).toEqual(input.body[1].actions);
				expect(res.send).toBeCalledTimes(1);
				done();
			});
		});
	});
});

describe("ControllerStubRemove", function() {
	describe("contructor", function() {
		it("should construct properly", function() {
			const instance = factory.createControllerProxyRemove();
			expect(instance.method).toEqual(factory.CONTROLLER_DEFAULTS.method);
			expect(instance.path).toEqual(factory.CONTROLLER_DEFAULTS.path);
			expect(instance.server).toEqual(factory.CONTROLLER_DEFAULTS.server);
		});
	});

	describe("handler", function() {
		it("should respond with error if request fails validation", function(done) {
			const instance = factory.createControllerProxyRemove();
			const req = factory.createRequest(require("./input/proxyRemoveRequestInvalid"));
			const res = factory.createResponse();
			instance.handler(req, res, (error) => {
				expect(error).not.toBeUndefined();
				done();
			});
		});

		it("should successfully remove stub", function(done) {
			const server = factory.createServer();
			const instance = factory.createControllerProxyRemove({server});
			const req = factory.createRequest(require("./input/proxyRemoveRequestStubs"));
			const res = factory.createResponse();
			// setup a stub that we are going to remove
			addProxyStub(server, require("./input/proxyAddRequestStub").body);
			expect(map.stubIdToActions.has("urn:stub:id")).toEqual(true);
			instance.handler(req, res, (error) => {
				expect(error).toBeUndefined();
				expect(map.stubIdToActions.has("urn:stub:id")).toEqual(false);
				expect(res.send).toBeCalledTimes(1);
				done();
			});
		});

		it("should report with error if stub does not exist", function(done) {
			const instance = factory.createControllerProxyRemove();
			const input = require("./input/proxyRemoveRequestStubsDNE");
			const req = factory.createRequest(input);
			const res = factory.createResponse();
			instance.handler(req, res, (error) => {
				expect(error).not.toBeUndefined();
				expect(res.send).toBeCalledTimes(1);
				done();
			});
		});
	});
});
