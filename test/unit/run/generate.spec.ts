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
