import { Logger as PinoLogger } from "pino";

import { BaseError } from "../errors";

import { ITransactionLogger, LogContext } from "./types";

class TransactionLogger implements ITransactionLogger {
	constructor(private pinoLogger: PinoLogger) {}

	public info(message: string, transactionId: string, context?: LogContext): void {
		this.pinoLogger.info({ transactionId, ...context }, message);
	}

	public warn(message: string, transactionId: string, context?: LogContext): void {
		this.pinoLogger.warn({ transactionId, ...context }, message);
	}

	public error(message: string, transactionId: string, error?: BaseError, context?: LogContext): void {
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
		this.pinoLogger.error({ transactionId, ...errorMeta, ...context }, message);
	}

	public debug(message: string, transactionId: string, context?: LogContext): void {
		this.pinoLogger.debug({ transactionId, ...context }, message);
	}
}

export default TransactionLogger;
