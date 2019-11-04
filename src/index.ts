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


import {parseCommandLine} from "./cli";
import run from "./run";


try {
	const params = parseCommandLine();
	run(params);
} catch(error) {
	console.error(`Attempt to startup failed: ${error.message}`);
	console.log("Usage: node index.js <cfg-path>");
}
