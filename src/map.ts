/**
 * Date: 11/8/19
 * Time: 11:19 PM
 * @license MIT (see project's LICENSE file)
 */
import {ControllerBase} from "./controller/base";
import {ProxyAction} from "./types/proxy";

/**
 * A singleton mapping of some popular characters
 */
class BeetleMap {
	public readonly routeIdToController: Map<string, ControllerBase> = new Map<string, ControllerBase>();
	public readonly stubIdToActions: Map<string, ProxyAction[]> = new Map<string, ProxyAction[]>();
	public readonly stubIdToRouteId: Map<string, string> = new Map<string, string>();

	/**
	 * @throws {Error}
	 */
	public getActionsByStubId(stubId: string): ProxyAction[] {
		if(this.stubIdToActions.has(stubId)) {
			return this.stubIdToActions.get(stubId) as ProxyAction[];
		} else {
			throw new Error(`could not find actions for ${stubId}`);
		}
	}

	/**
	 * @throws {Error}
	 */
	public getControllerByRoute<T extends ControllerBase>(routeId: string): T {
		if(this.routeIdToController.has(routeId)) {
			return this.routeIdToController.get(routeId) as T;
		} else {
			throw new Error(`could not find route for ${routeId}`);
		}
	}

	/**
	 * @throws {Error}
	 */
	public getRouteIdByStubId(stubId: string): string {
		if(this.stubIdToRouteId.has(stubId)) {
			return this.stubIdToRouteId.get(stubId) as string;
		} else {
			throw new Error(`could not find route for ${stubId}`);
		}
	}
}

export default new BeetleMap();
