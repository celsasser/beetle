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

import {CliProperties} from "./types/cli";

export function parseCommandLine(): CliProperties {
	const result: CliProperties = {};
	const args = process.argv[0].endsWith("node")
		? process.argv.slice(2)
		: process.argv.slice(1);

	if(args.length > 1) {
		throw new Error("incorrect number of paramaters");
	} else if(args.length === 1) {
		result.setupPath = args[0];
	}
	return result;
}
