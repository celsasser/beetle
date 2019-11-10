/**
 * Copyright (c) 2018 Home Box Office, Inc. as an unpublished
 * work. Neither this material nor any portion hereof may be copied or
 * distributed without the express written consent of Home Box Office, Inc.
 *
 * This material also contains proprietary and confidential information
 * of Home Box Office, Inc. and its suppliers, and may not be used by or
 * disclosed to any person, in whole or in part, without the prior written
 * consent of Home Box Office, Inc.
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
