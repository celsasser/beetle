/**
 * Date: 11/1/19
 * Time: 11:15 PM
 * @license MIT (see project's LICENSE file)
 */

import * as ajv from "ajv";
import * as assert from "assert";
import * as fs from "fs-extra";
import * as path from "path";
import {formatJSON} from "./core/utils";

class Validate {
	private ajv: ajv.Ajv;
	private loaded: {[path: string]: string};

	public constructor() {
		this.ajv = new ajv();
		this.loaded = {};
	}

	/**
	 * Validates and adds schema to the validate instance.  You only NEED to call this directly for referenced schemas.
	 * For all others you may refer to them directly in <code>validateData</code> and they will be _loaded if they are not already.
	 * @param schemaPath - file path of the schema
	 * @returns $id of schema
	 * @throws {Error} if path to schema cannot be found
	 */
	public addSchema(schemaPath: string): string {
		schemaPath = path.resolve(schemaPath);
		if(!(schemaPath in this.loaded)) {
			try {
				const schema = fs.readJSONSync(schemaPath);
				assert.ok("$id" in schema);
				this.ajv.addSchema(schema);
				this.loaded[schemaPath] = schema.$id;
			} catch(error) {
				throw new Error(`failed to add schemaPath ${schemaPath} - ${error.message}`);
			}
		}
		return this.loaded[schemaPath];
	}

	/**
	 * Validate data using the specified schema
	 * @param schemaPath - file path of the schema
	 * @param data - object to be validated
	 * @throws {Error}
	 */
	public validateData(schemaPath: string, data: any): void {
		const id = this.addSchema(schemaPath);
		const validator = this.ajv.getSchema(id);
		if(!validator) {
			throw new Error(`could not find schema for schemaId=${id}`);
		}
		if(!validator(data)) {
			throw new Error(formatJSON(validator.errors));
		}
	}

	/**
	 * Validate data in <param>path</param> using the specified schema
	 * @param schemaPath - file path of the schema
	 * @param dataPath - file path of data
	 * @returns data loaded in <code>dataPath<code>
	 * @throws {Error}
	 */
	public validateDataAtPath(schemaPath: string, dataPath: string): any {
		const data = fs.readJSONSync(dataPath);
		const id = this.addSchema(schemaPath);
		const validator = this.ajv.getSchema(id);
		if(!validator) {
			throw new Error(`could not find schema for schemaId=${id}`);
		}
		if(!validator(data)) {
			const errors = (validator.errors || []).map(error => Object.assign({
				dataFile: dataPath
			}, error));
			throw new Error(formatJSON(errors));
		}
		return data;
	}

	/**
	 * Validate that schema itself is valid. Handy for debugging and testing.
	 * @param schemaPath - file path of the schema
	 * @throws {Error}
	 */
	public validateSchema(schemaPath: string): void {
		const schema = fs.readJSONSync(schemaPath);
		this.ajv.validateSchema(schema);
		try {
			// this guy will force it to compile (which validateSchema does not seem to do)
			this.ajv.getSchema(this.addSchema(schemaPath));
		} catch(error) {
			throw new Error(`failed to compile schema ${schemaPath}: ${error}`);
		}
	}
}

/**
 * Creates an instance complete with every single schema we support loaded
 */
function _createInstance(): Validate {
	const instance = new Validate();
	// add all of our schemas that act as a library and may not be directly referenced
	instance.addSchema("./res/schemas/schema-library.json");
	return instance;
}

export default _createInstance();
