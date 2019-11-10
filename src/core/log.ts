/**
 * Date: 11/9/19
 * Time: 9:21 PM
 * @license MIT (see project's LICENSE file)
 */
import {Severity} from "../types";

type Logger = (message: string, metadata?: Metadata) => void;
type Metadata = {[property: string]: any};

export const debug: Logger = log.bind(null, Severity.DEBUG);
export const error: Logger = log.bind(null, Severity.ERROR);
export const info: Logger = log.bind(null, Severity.INFO);
export const warn: Logger = log.bind(null, Severity.WARN);

export function log(severity: Severity, message: string, metadata?: Metadata): void {
	const formatted = _format(severity, message, metadata);
	console[severity](formatted);
}

function _format(severity: Severity, message: string, metadata?: Metadata) {
	const formatted = `[${severity.toUpperCase()}] ${message}`;
	return (metadata !== undefined)
		? `${formatted}\n${JSON.stringify(metadata, null, "   ")}`
		: formatted;
}

