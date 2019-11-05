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
import {
	forwardRequest,
	logRequest
} from "../actions";
import {respondToClient} from "../actions/respond";
import {formatProxySummary} from "../core/utils";
import {Server} from "../server";
import {
	ProxyActionBase,
	ProxyActionForward,
	ProxyActionRespond,
	ProxyActionType,
	ProxyConfiguration
} from "../types/proxy";
import {ControllerBase} from "./base";


export class ControllerAction extends ControllerBase {
	public readonly cfg: ProxyConfiguration;

	public constructor(server: Server, cfg: ProxyConfiguration) {
		super(server, cfg.proxy.method, cfg.proxy.path);
		this.cfg = cfg;
	}

	public get cliSummary(): string {
		return `Proxying: ${this.routeDescription}`;
	}

	public route(req: Request, res: Response, next?: NextFunction): void {
		this._processResponder(req, res);
		this._processAncillary(req);
	}

	/**
	 * Forwards the specified action to the appropriate action handler
	 */
	private _processAction(action: ProxyActionBase, req: Request): Promise<object> {
		if(action.type === ProxyActionType.FORWARD) {
			return forwardRequest({
				cfg: this.cfg,
				method: (action as ProxyActionForward).method,
				req, url: (action as ProxyActionForward).url
			});
		} else if(action.type === ProxyActionType.LOG) {
			return logRequest({cfg: this.cfg, req});
		} else if(action.type === ProxyActionType.RESPONSE) {
			return Promise.resolve((action as ProxyActionRespond).response);
		} else {
			return Promise.reject(new Error(`unknown stub action ${action.type}`));
		}
	}

	/**
	 * Finds and processes the action that is designated as the <code>responder</code>
	 */
	private _processResponder(req: Request, res: Response): Promise<void> {
		const responder = this.cfg.actions.find(action => action.responder);
		return this._processAction(responder as ProxyActionBase, req)
			.then(response => respondToClient(res, response))
			.catch(error => {
				console.error(`ControllerAction._processResponder(): attempt to proxy ${formatProxySummary(this.cfg)} failed - ${error}`);
			});
	}

	/**
	 * Processes all non responder actions
	 */
	private _processAncillary(req: Request): Promise<void> {
		const actions = this.cfg.actions.filter(action => !action.responder);
		const promises = actions.map(action => this._processAction(action, req)
			.catch(error => {
				console.error(`ControllerAction._processAncillary(): attempt to proxy ${formatProxySummary(this.cfg)} failed - ${error}`);
			})
		);
		return Promise.all(promises)
			.then(() => Promise.resolve());
	}
}
