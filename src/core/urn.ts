/**
 * Date: 11/2/19
 * Time: 7:46 PM
 * @license MIT (see project's LICENSE file)
 */

import * as shortid from "shortid";
import {UrnTypeId} from "../types";

export function createUrn(type: UrnTypeId, suffix?: string): string {
	return (suffix)
		? `urn:beetle:${type}:${suffix}:${shortid.generate()}`
		: `urn:beetle:${type}:${shortid.generate()}`;
}
