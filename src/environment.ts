/**
 * Date: 11/23/19
 * Time: 8:48 PM
 * @license MIT (see project's LICENSE file)
 */
import {CLIGenerateSetupParams, CLIProxyServerParams} from "./types";

/**
 * Manages runtime properties as a singleton
 */
class Environment {
	private _debug: boolean = false;
	private _verbose: boolean = false;

	public get debug(): boolean {
		return this._debug;
	}

	public get verbose(): boolean {
		return this._verbose;
	}

	/**
	 * Gets state of all properties
	 */
	public get(): {[property: string]: any} {
		return {
			debug: this._debug,
			verbose: this._verbose
		};
	}

	/**
	 * Set state of supported properties
	 * @param configuration
	 */
	public set(configuration: CLIGenerateSetupParams|CLIProxyServerParams) {
		if("debug" in configuration) {
			this._debug = configuration.debug as boolean;
		}
		if("verbose" in configuration) {
			this._verbose = configuration.verbose as boolean;
		}
	}
}

export default new Environment();
