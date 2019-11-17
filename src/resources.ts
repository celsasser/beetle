/**
 * Date: 11/16/19
 * Time: 8:30 PM
 * @license MIT (see project's LICENSE file)
 */

import {readJSONSync} from "fs-extra";
import {join as joinPath} from "path";

export function loadConfigurationResource<T>(relativePath: string): T {
	return readJSONSync(joinPath("./res/configurations", relativePath));
}

export function loadDefaultResource<T>(relativePath: string): T {
	return readJSONSync(joinPath("./res/defaults", relativePath));
}
