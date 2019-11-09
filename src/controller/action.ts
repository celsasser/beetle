/**
 * Date: 11/2/19
 * Time: 7:48 PM
 * @license MIT (see project's LICENSE file)
 */

import {
	NextFunction,
	Request,
	Response
} from "express";
import * as _ from "lodash";
import {
	forwardRequest,
	logRequest
} from "../actions";
import {respondToClient} from "../actions/respond";
import {formatRouteSummary} from "../core/utils";
import {Server} from "../server";
import {
	ProxyAction,
	ProxyActionBase,
	ProxyActionForward,
	ProxyActionRespond,
	ProxyActionType,
	ProxyRoute
} from "../types/proxy";
import {ControllerBase} from "./base";

export class ControllerAction extends ControllerBase {
	public readonly route: ProxyRoute;
	private actions: ProxyAction[] = [];

	public constructor(server: Server, route: ProxyRoute) {
		super(server, route.method, route.path);
		this.route = route;
	}

	/*********************
	 * Public Properties
	 **********************/
	public get cliSummary(): string {
		return `Proxying: ${this.routeDescription}`;
	}

	/*********************
	 * Public Interface
	 *********************/
	/**
	 * We give priority to the most recently added actions to the last added actions
	 * @param actions
	 */
	public addActions(actions: ProxyAction[]): void {
		this.actions = actions.concat(this.actions);
	}

	/**
	 * We give priority to the most recently added actions to the last added actions
	 * @param actions
	 */
	public removeActions(actions: ProxyAction[]): void {
		actions.forEach(_.pull.bind(_, this.actions));
	}

	public handler(req: Request, res: Response, next?: NextFunction): void {
		this._processResponder(req, res);
		this._processAncillary(req);
	}

	/*********************
	 * Private Interface
	 *********************/
	private _findResponder(): ProxyActionBase|undefined {
		return _.find<ProxyActionBase>(this.actions, action => action.type === ProxyActionType.RESPOND)
			|| _.find<ProxyActionBase>(this.actions, action => action.type === ProxyActionType.FORWARD)
			|| this.actions[0];
	}

	/**
	 * Forwards the specified action to the appropriate action handler
	 */
	private _processAction(action: ProxyActionBase, req: Request): Promise<object> {
		if(action.type === ProxyActionType.FORWARD) {
			return forwardRequest({
				method: (action as ProxyActionForward).method,
				req,
				url: (action as ProxyActionForward).url
			});
		} else if(action.type === ProxyActionType.LOG) {
			return logRequest(req);
		} else if(action.type === ProxyActionType.RESPOND) {
			return Promise.resolve((action as ProxyActionRespond).response);
		} else {
			return Promise.reject(new Error(`unknown stub action ${action.type}`));
		}
	}

	/**
	 * Finds and processes the action that is designated as the <code>responder</code>
	 */
	private _processResponder(req: Request, res: Response): Promise<void> {
		const responder = this._findResponder();
		if(responder === undefined) {
			return this._processUnhandledRequest(req, res);
		} else {
			return this._processAction(responder as ProxyActionBase, req)
				.then(response => respondToClient(res, response))
				.catch(error => {
					console.error(`ControllerAction._processResponder(): attempt to proxy ${formatRouteSummary(this.route)} failed - ${error}`);
				});
		}
	}

	/**
	 * Processes all non responder actions
	 */
	private _processAncillary(req: Request): Promise<void> {
		const responder = this._findResponder();
		const actions = this.actions.filter(action => action !== responder);
		const promises = actions.map(action => this._processAction(action, req)
			.catch(error => {
				console.error(`ControllerAction._processAncillary(): attempt to proxy ${formatRouteSummary(this.route)} failed - ${error}`);
			})
		);
		return Promise.all(promises)
			.then(() => Promise.resolve());
	}

	private _processUnhandledRequest(req: Request, res: Response): Promise<void> {
		console.warn(`No responders configured for ${this.routeDescription}`);
		respondToClient(res, require("./res/defaults/default-stub-response"));
		return Promise.resolve();
	}
}
