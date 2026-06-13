"use client";

import pino, { Logger as PinoLogger } from "pino";

import { EnvironmentRegistry } from "../config";
import { LogLevel, NodeEnvironment } from "../constants";

import Logger from "./logger";
import TransactionLogger from "./transactionLogger";
import { ILogger, ITransactionLogger } from "./types";

class LoggerFactoryInternal {
	private static instance: LoggerFactoryInternal;
	private static rootLoggerRegistry = new Map<"client" | "server", PinoLogger>();

	private constructor(private readonly environmentRegistry: typeof EnvironmentRegistry) {}

	public getLogger(scope: string): ILogger {
		const rootLogger = this.getRootLogger();
		const childLogger = rootLogger.child({ scope });
		return new Logger(childLogger);
	}

	public getTransactionLogger(scope: string): ITransactionLogger {
		const rootLogger = this.getRootLogger();
		const childLogger = rootLogger.child({ scope, logType: "transaction" });
		return new TransactionLogger(childLogger);
	}

	public static getInstance(environmentRegistry: typeof EnvironmentRegistry): LoggerFactoryInternal {
		if(!LoggerFactoryInternal.instance) {
			LoggerFactoryInternal.instance = new LoggerFactoryInternal(environmentRegistry);
		}
		return LoggerFactoryInternal.instance;
    }

	private getRootLogger(): PinoLogger {
		const isServerContext = typeof window === "undefined";
		const key = isServerContext ? "server" : "client";

		const existingRootLogger = LoggerFactoryInternal.rootLoggerRegistry.get(key);
		if(existingRootLogger) {
			return existingRootLogger;
		}

		const isDev = this.environmentRegistry.NODE_ENV === NodeEnvironment.DEV;
		const newRootLogger = isServerContext
			? this.createServerPinoLogger(isDev)
			: this.createClientPinoLogger(isDev);

		LoggerFactoryInternal.rootLoggerRegistry.set(key, newRootLogger);
		return newRootLogger;
	}

	private createClientPinoLogger(isDev: boolean = false): PinoLogger {
		const environmentClientLogLevel = this.environmentRegistry.CLIENT_LOG_LEVEL
			|| this.environmentRegistry.LOG_LEVEL
			|| LogLevel.INFO;
		return pino({
			base: {
				runtime: "browser",
				url: window.location.href,
			},
			browser: {
				asObject: true,
				write: logObject => {
					console.log(logObject);
					if(!isDev) {
						const blob = new Blob([JSON.stringify(logObject)], { type: "application/json" });
						navigator.sendBeacon("/api/client-logs", blob);
					}
				}
			},
			level: isDev ? LogLevel.TRACE : environmentClientLogLevel
		});
	}

	private createServerPinoLogger(isDev: boolean = false): PinoLogger {
		if(isDev) {
			return pino({
				base: {
					runtime: "server",
					env: this.environmentRegistry.NODE_ENV,
				},
				level: this.environmentRegistry.SERVER_LOG_LEVEL
					|| this.environmentRegistry.LOG_LEVEL
					|| LogLevel.INFO,
				transport: {
					options: {
						colorize: true
					},
					target: "pino-pretty"
				}
			});
		}
		return pino(
			{
				level: LogLevel.INFO
			},
			pino.destination({
				dest: process.stdout.fd,
				sync: true
			})
		);
	}

}

const LoggerFactory = LoggerFactoryInternal.getInstance(EnvironmentRegistry);

export default LoggerFactory;
