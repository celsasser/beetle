/**
 * Date: 11/1/19
 * Time: 10:00 PM
 * @license MIT (see project's LICENSE file)
 */

import * as fs from "fs-extra";
import * as _ from "lodash";
import {
	parse as parsePath,
	resolve as resolvePath
} from "path";
import {
	CLIGenerateSetupParams,
	ProxySetup,
	ProxyStub,
	ServerProperties
} from "../types";
import validate from "../validate";

interface ResourceReference {
	file?: string;
	library?: string;
}

type GenericObject = {[property: string]: any};

/**
 * Processes a script and generates a setup configuration
 */
class Script {
	private readonly scriptPath: string;
	private library: GenericObject = {};
	private scriptData: GenericObject = {};

	public constructor(path: string) {
		this.scriptPath = path;
	}

	/**
	 * Translates the script into a setup configuration
	 */
	public generate(): ProxySetup {
		this.scriptData = this._loadJSON(this.scriptPath);
		this._loadLibrary();
		return {
			server: this._loadScriptData(this.scriptData.server) as ServerProperties,
			stubs: this._loadScriptData(this.scriptData.stubs) as ProxyStub[]
		};

	}

	private _loadJSON(path: string): any {
		try {
			return fs.readJSONSync(path);
		} catch(error) {
			throw new Error(`could not load ${path} - ${error.message}`);
		}
	}

	private _loadJSONRelativeToScript(relative: string): any {
		const parsed = parsePath(this.scriptPath);
		const path = resolvePath(parsed.dir, relative);
		try {
			return fs.readJSONSync(path);
		} catch(error) {
			throw new Error(`could not load relative path ${relative} (resolved as ${path}) - ${error.message}`);
		}
	}

	/**
	 * Loads the library if there is one. Note that the script supports "file" type resource references
	 */
	private _loadLibrary(): void {
		if("library" in this.scriptData) {
			this.library = this._loadScriptData(this.scriptData.library);
		}
	}

	/**
	 * Processes any blob of script data.
	 * @param data
	 * @private
	 */
	private _loadScriptData(data?: any): any {
		if(_.isArray(data)) {
			return _.map(data, this._loadScriptData.bind(this));
		} else if(_.isPlainObject(data)) {
			let result: any = {};
			for(const [key, value] of Object.entries(data)) {
				if(key === "$source") {
					// this should be the only property within and we want to entirely replace result
					// with the returned value. If there are other values then the script is wrong and
					// will mostly likely yield unexpected results
					result = this._resolveScriptReference(value as ResourceReference);
					// we pass it back through the machine so that refs in refs are picked up
					result = this._loadScriptData(result);
				} else {
					result[key] = this._loadScriptData(value);
				}
			}
			return result;
		}
		return data;
	}

	private _resolveScriptReference(reference: ResourceReference): any {
		if("file" in reference) {
			const path: string = reference.file as string;
			return this._loadJSONRelativeToScript(path);
		} else if("library" in reference) {
			const path: string = reference.library as string;
			if(_.has(this.library, path)) {
				return _.get(this.library, path);
			} else {
				throw new Error(`could not resolve library reference ${path}`);
			}
		} else {
			throw new Error(`unknown source reference ${JSON.stringify(reference)}`);
		}
	}
}

export default async function run(params: CLIGenerateSetupParams): Promise<ProxySetup> {
	const script: Script = new Script(params.inputPath);
	const setup = script.generate();
	const formatted = JSON.stringify(setup, null, "\t");
	if(params.outputPath) {
		await fs.writeFile(params.outputPath, formatted, {encoding: "utf8"});
	} else {
		console.log(formatted);
	}
	if(params.validate) {
		validate.validateData("./res/schemas/schema-setup.json", setup);
	}
	return setup;
}

