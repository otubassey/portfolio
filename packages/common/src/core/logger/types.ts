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

export interface LoggerProvider {
	getLogger: (scope: string) => ILogger;
	getTransactionLogger: (scope: string) => ITransactionLogger;
}

const LoggerFactoryEnvironmentVariable = Object.freeze({
	CLIENT_LEVEL: "LOG_CLIENT_LEVEL",
	DEFAULT: "LOG_LEVEL",
	NODE_ENV: "NODE_ENV",
	SERVER_LEVEL: "LOG_SERVER_LEVEL"
} as const);

export type LoggerFactoryEnvironmentKeys = typeof LoggerFactoryEnvironmentVariable[keyof typeof LoggerFactoryEnvironmentVariable];
