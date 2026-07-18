import { Logger as PinoLogger } from "pino";

import { BaseError } from "../errors";

import { ILogger, LogContext } from "./types";

class Logger implements ILogger {
	constructor(protected pinoLogger: PinoLogger) {}

	public info(message: string, context?: LogContext): void {
		if(context) {
			this.pinoLogger.info(context, message);
		} else {
			this.pinoLogger.info(message);
		}
	}

	public warn(message: string, context?: LogContext): void {
		if(context) {
			this.pinoLogger.warn(context, message);
		} else {
			this.pinoLogger.warn(message);
		}
	}

	public error(message: string, error?: BaseError, context?: LogContext): void {
		const errorMeta = error
			? {
				error: {
					message: error.message,
					detail: error.detail,
					txId: error.transactionId,
					stack: error.stack
				}
			}
			: {};
		this.pinoLogger.error({ ...errorMeta, ...context }, message);
	}

	public debug(message: string, context?: LogContext): void {
		if(context) {
			this.pinoLogger.debug(context, message);
		} else {
			this.pinoLogger.debug(message);
		}
	}
}

export default Logger;
