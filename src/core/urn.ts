/**
 * Date: 11/2/19
 * Time: 7:46 PM
 * @license MIT (see project's LICENSE file)
 */

import * as shortid from "shortid";
import {UrnTypeId} from "../types/core";


export function createUrn(type: UrnTypeId): string {
	return `urn:beetle:${type}:${shortid.generate()}`;
}
