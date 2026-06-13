export type LogContext = Record<string, any>;

export interface ILogger {
	info(message: string, context?: LogContext): void;
	warn(message: string, context?: LogContext): void;
	error(message: string, error?: Error, context?: LogContext): void;
	debug(message: string, context?: LogContext): void;
}

export interface ITransactionLogger {
	info(message: string, transactionId: string, context?: LogContext): void;
	warn(message: string, transactionId: string, context?: LogContext): void;
	error(message: string, transactionId: string, error?: Error, context?: LogContext): void;
	debug(message: string, transactionId: string, context?: LogContext): void;
}
