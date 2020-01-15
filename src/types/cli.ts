/**
 * Date: 10/29/19
 * Time: 8:28 PM
 * @license MIT (see project's LICENSE file)
 */

export interface CLIGenerateSetupParams {
	inputPath: string;
	outputPath?: string;
	validate?: boolean;
	verbose?: boolean;
}

export interface CLIProxyServerParams {
	debug?: boolean;
	setupPath?: string;
	verbose?: boolean;
}

