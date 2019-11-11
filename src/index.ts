/**
 * Date: 11/1/19
 * Time: 10:00 PM
 * @license MIT (see project's LICENSE file)
 */

import {Command} from "commander";
import * as log from "./core/log";
import runGenerateSetup from "./run/generate";
import runProxyServer from "./run/server";
import validate from "./validate";

interface GenerateOptions {
	verbose?: boolean;
}

interface RunOptions {
	verbose?: boolean;
}

const program = new Command();
program.version(require("../package.json").version);

/**
 * Generate setup configurations
 */
program.command("generate <templatePath> [specPath]")
	.description("Generates a setup configuration from <templatePath>. By default writest ot stdout")
	.option("-v, --verbose", "log verbose")
	.action(async function(inputPath: string, outputPath: string, options: GenerateOptions) {
		try {
			await runGenerateSetup({
				inputPath,
				outputPath,
				verbose: Boolean(options.verbose)
			});
		} catch(error) {
			log.error(`Attempt to generate ${inputPath} failed: ${error.message}`);
			process.exit(1);
		}
	});

/**
 * Run the proxy server
 */
program.command("run [specPath]", {isDefault: true})
	.description("Start the proxy machine")
	.option("-v, --verbose", "log verbose")
	.action(async function(setupPath: string, options: RunOptions) {
		try {
			await runProxyServer({
				setupPath,
				verbose: Boolean(options.verbose)
			});
		} catch(error) {
			log.error(`Attempt to run failed: ${error.message}`);
			process.exit(1);
		}
	});

/**
 * Validate setup configuration
 */
program.command("validate [setupPath]")
	.description("Validates the setup specification")
	.action(async function(setupPath: string) {
		try {
			validate.validateDataAtPath("./res/schemas/schema-setup.json", setupPath);
		} catch(error) {
			log.error(`Validation failed: ${error.message}`);
			process.exit(1);
		}
	});

program.parse(process.argv);
