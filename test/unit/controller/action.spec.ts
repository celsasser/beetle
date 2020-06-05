/**
 * Date: 11/10/19
 * Time: 12:02 AM
 * @license MIT (see project's LICENSE file)
 */

import * as log from "../../../src/core/log";
import * as factory from "../../factory";
import {createProxyActionResponse} from "../../factory";
import {performRouteHandlerTest} from "./perform";

jest.mock("../../../src/core/log");

describe("ControllerAction", function() {
	describe("contructor", function() {
		it("should construct properly", function() {
			const instance = factory.createControllerAction();
			expect(instance.actions).toEqual([]);
			expect(instance.route).toEqual(factory.CONTROLLER_DEFAULTS.route);
			expect(instance.server).toEqual(factory.CONTROLLER_DEFAULTS.server);
		});
	});

	describe("_findNonResponderActions", function() {
		it("should return empty array if no actions exist", function() {
			const instance = factory.createControllerAction();
			// @ts-ignore
			expect(instance._findNonResponderActions()).toEqual([]);
		});

		it("should return empty array if only responder exists", function() {
			const instance = factory.createControllerAction({
				actions: [factory.createProxyActionResponse()]
			});
			// @ts-ignore
			expect(instance._findNonResponderActions()).toEqual([]);
		});

		it("should return all but responder when other actions exist", function() {
			const instance = factory.createControllerAction();
			const actionLog = factory.createProxyActionLog();
			const actionResponse = factory.createProxyActionResponse();
			instance.addActions([
				actionLog,
				actionResponse
			]);
			// @ts-ignore
			expect(instance._findNonResponderActions()).toEqual([actionLog]);
		});
	});

	describe("_findResponderAction", function() {
		it("should return undefined if no actions exist", function() {
			const instance = factory.createControllerAction();
			// @ts-ignore
			expect(instance._findResponderAction()).toBeUndefined();
		});

		it("should return loner action if only one exists", function() {
			const instance = factory.createControllerAction();
			const action = factory.createProxyActionLog();
			instance.addActions([action]);
			// @ts-ignore
			expect(instance._findResponderAction()).toEqual(action);
		});

		it("should prefer response action over others", function() {
			const instance = factory.createControllerAction();
			const actionLog = factory.createProxyActionLog();
			const actionResponse = factory.createProxyActionResponse();
			instance.addActions([
				actionLog,
				actionResponse
			]);
			// @ts-ignore
			expect(instance._findResponderAction()).toEqual(actionResponse);
		});
	});

	describe("addActions", function() {
		it("should properly insert an action", function() {
			const instance = factory.createControllerAction();
			const action = factory.createProxyActionLog();
			instance.addActions([action]);
			expect(instance.actions).toEqual([action]);
		});

		it("should insert actions at the head of the list", function() {
			const instance = factory.createControllerAction();
			const action1 = factory.createProxyActionLog();
			const action2 = factory.createProxyActionResponse();
			instance.addActions([action1]);
			instance.addActions([action2]);
			expect(instance.actions)
				.toEqual([
					action2,
					action1
				]);
		});
	});

	describe("removeActions", function() {
		it("should properly remove actions", function() {
			const instance = factory.createControllerAction();
			const action1 = factory.createProxyActionLog();
			const action2 = factory.createProxyActionResponse();
			instance.addActions([
				action1,
				action2
			]);
			instance.removeActions([action1]);
			expect(instance.actions).toEqual([action2]);
		});
	});

	describe("handler", function() {
		it("should respond with default response if there are no responders", async function() {
			const controller = factory.createControllerAction();
			return performRouteHandlerTest({
				controller,
				expected: require("../../../res/defaults/default-stub-response")
			}).then(() => {
				expect(log.warn)
					.toBeCalledWith(`No responders configured for ${controller.description}`);
			});
		});

		it("should respond as per responder's response", async function() {
			const response = require("./input/actionTestResponse");
			const controller = factory.createControllerAction({
				actions: [
					createProxyActionResponse({response})
				]
			});
			return performRouteHandlerTest({
				controller,
				expected: response
			});
		});
	});
});
