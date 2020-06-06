#!/usr/bin/env node

/**
 * Date: 11/1/19
 * Time: 10:00 PM
 * @license MIT (see project's LICENSE file)
 */

import {Command} from "commander";
import * as log from "./core/log";
import environment from "./environment";
import {getSchemaResourcePath} from "./resources";
import runGenerateSetup from "./run/generate";
import runProxyServer from "./run/server";
import validate from "./validate";

// todo: move these guys to types
interface GenerateOptions {
	validate?: boolean;
	verbose?: boolean;
}

interface RunOptions {
	verbose?: boolean;
}

const program = new Command();
// tslint:disable-next-line: no-var-requires
program.version(require("../package.json").version);

/**
 * todo: let's get all functionality into the handlers. And match param signatures so that we don't
 * have to have redundant'ish structures.
 */

/**
 * Generate setup configurations
 */
program.command("generate <templatePath> [specPath]")
	.description("Generates a setup configuration from <templatePath>. By default writes to stdout")
	.option("-v, --validate", "validate rendered script")
	.action(async function(inputPath: string, outputPath: string, options: GenerateOptions) {
		const configuration = {
			inputPath,
			outputPath,
			validate: Boolean(options.validate),
			verbose: Boolean(options.verbose)
		};
		environment.set(configuration);
		try {
			await runGenerateSetup(configuration);
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
		const configuration = {
			setupPath,
			verbose: Boolean(options.verbose)
		};
		environment.set(configuration);
		try {
			await runProxyServer(configuration);
		} catch(error) {
			log.error(`Attempt to run failed: ${error.message}`);
			process.exit(1);
		}
	});

/**
 * Validate setup configuration
 */
program.command("validate <setupPath>")
	.description("Validates the setup specification")
	.action(async function(setupPath: string) {
		try {
			validate.validateDataAtPath(getSchemaResourcePath("schema-setup.json"), setupPath);
		} catch(error) {
			log.error(`Validation failed: ${error.message}`);
			process.exit(1);
		}
	});

program.parse(process.argv);
