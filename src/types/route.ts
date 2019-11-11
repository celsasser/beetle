/**
 * Date: 11/10/19
 * Time: 11:59 PM
 * @license MIT (see project's LICENSE file)
 */
import {HttpMethod, ServerProtocol} from "./server";

export interface RouteProperties {
	hostname: string;
	method: HttpMethod;
	path: string;
	port: number;
	protocol: ServerProtocol;
	purpose: string;
}
