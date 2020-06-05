/**
 * Date: 11/16/19
 * Time: 8:30 PM
 * @license MIT (see project's LICENSE file)
 */

import {readJSONSync} from "fs-extra";
import {join, resolve} from "path";

const projectRoot = resolve(__dirname, "..");

/**
 * Gets absolute path for a configuration resource
 * @param relativePath - relative to "./res/configurations"
 */
export function getConfigurationResourcePath(relativePath: string): string {
	return join(projectRoot, "./res/configurations", relativePath);
}

/**
 * Gets absolute path for a default resource
 * @param relativePath - relative to "./res/defaults"
 */
export function getDefaultResourcePath(relativePath: string): string {
	return join(projectRoot, "./res/defaults", relativePath);
}

/**
 * Gets absolute path for a schema resource
 * @param relativePath - relative to "./res/schemas"
 */
export function getSchemaResourcePath(relativePath: string): string {
	return join(projectRoot, "./res/schemas", relativePath);
}

export function loadConfigurationResource<T>(relativePath: string): T {
	return readJSONSync(getConfigurationResourcePath(relativePath));
}

export function loadDefaultResource<T>(relativePath: string): T {
	return readJSONSync(getDefaultResourcePath(relativePath));
}

