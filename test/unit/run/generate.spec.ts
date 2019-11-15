/**
 * Date: 11/13/19
 * Time: 10:37 PM
 * @license MIT (see project's LICENSE file)
 */

import run from "../../../src/run/generate";

it("should properly load a valid script", async function() {
	const setup = await run({
		inputPath: `${__dirname}/input/generate-script-valid.json`
	});
	expect(setup).toEqual(require("./output/generate-script-valid.json"));
});

it("should raise an exception with error information if script cannot be parsed", async function() {
	return run({
		inputPath: `${__dirname}/input/generate-script-broken.json`
	})
		.catch((error: Error) => {
			expect(error.message).toEqual(expect.stringContaining("could not load relative path ./file-does-not-exist.json"));
		})
		.then(()=>expect.assertions(1));
});
