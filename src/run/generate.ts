/**
 * Date: 11/1/19
 * Time: 10:00 PM
 * @license MIT (see project's LICENSE file)
 */

import * as _ from "lodash";
import * as fs from "fs-extra";
import {CLIGenerateSetupParams, ProxySetup} from "../types";

interface ResourceReference {
	$source: {
		file?: string;
		library?: string;
	};
}

class Script {
	private readonly scriptPath: string;
	private library: {[property: string]: any} = {};
	private scriptData: {[key: string]: any} = {};

	public constructor(path: string) {
		this.scriptPath = path;
	}

	public async generate(): Promise<ProxySetup> {
		this.scriptData = await fs.readJSON(this.scriptPath);
		await this._loadLibrary();
		return {
			server: await this._processScriptData(this.scriptData.server),
			stubs: await this._processScriptData(this.scriptData.stubs)
		}

	}

	private async _loadLibrary(): Promise<void> {
		if("library" in this.scriptData) {

		}
	}

	private async _processScriptData(data?: any): Promise<any> {
		if(_.isArray(data)) {
			return _.map(data, this._processScriptData.bind(this));
		} else if(_.isPlainObject(data)) {
			return _.reduce(data, (result, value, key) => {
				if(key === "$source") {
					result = this._processScriptReference(value);
				} else {
					result[key] = this._processScriptData(value);
				}
				return result;
			}, {});
		}
		return data;
	}

	private async _processScriptReference(reference: ResourceReference): Promise<any> {
		if("file" in reference.$source) {
			const path: string = reference.$source.file as string;
			return fs.readJSON(path);
		} else if("library" in reference.$source) {
			const path: string = reference.$source.library as string;
			if(_.has(this.library, path)) {
				return _.get(this.library, path);
			} else {
				throw new Error(`could not resolve library reference ${path}`)
			}
		} else {
			throw new Error(`unknown source reference ${JSON.stringify(reference)}`)
		}
	}
}

export default async function run(params: CLIGenerateSetupParams): Promise<void> {
	const script: Script = new Script(params.inputPath);
	const setup = await script.generate();
	const formatted = JSON.stringify(setup, null, "\t");
	if(params.outputPath) {
		return fs.writeFileSync(params.outputPath, formatted, {encoding: "utf8"});
	} else {
		console.log(formatted);
	}
}

