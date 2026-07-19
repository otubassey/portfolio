import pino, { Logger as PinoLogger } from "pino";

import { EnvironmentRegistry } from "../config";
import { NodeEnvironment } from "../constants";

import LogLevel from "./logLevel";
import Logger from "./logger";
import TransactionLogger from "./transactionLogger";
import { ILogger, ITransactionLogger, LoggerFactoryEnvironmentKeys } from "./types";

class LoggerFactory {
	private static rootLoggerRegistry = new Map<"client" | "server", PinoLogger>();

	constructor(private readonly environmentRegistry: EnvironmentRegistry<LoggerFactoryEnvironmentKeys>) {}

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

	private getRootLogger(): PinoLogger {
		const isServerContext = typeof window === "undefined";
		const key = isServerContext ? "server" : "client";

		const existingRootLogger = LoggerFactory.rootLoggerRegistry.get(key);
		if(existingRootLogger) {
			return existingRootLogger;
		}

		const isDev = this.environmentRegistry.get("NODE_ENV") === NodeEnvironment.DEV;
		const newRootLogger = isServerContext
			? this.createServerPinoLogger(isDev)
			: this.createClientPinoLogger(isDev);

		LoggerFactory.rootLoggerRegistry.set(key, newRootLogger);
		return newRootLogger;
	}

	private createClientPinoLogger(isDev: boolean = false): PinoLogger {
		const environmentClientLogLevel = this.environmentRegistry.get("LOG_CLIENT_LEVEL")
			|| this.environmentRegistry.get("LOG_LEVEL")
			|| LogLevel.INFO;
		return pino({
			base: {
				runtime: "browser",
				url: window.location.href,
			},
			browser: {
				asObject: true,

				// TODO: Enable this after implementing this endpoint
				// write: logObject => {
				// 	if(!isDev) {
				// 		const blob = new Blob([JSON.stringify(logObject)], { type: "application/json" });
				// 		navigator.sendBeacon("/api/client-logs", blob);
				// 	}
				// }
			},
			level: isDev ? LogLevel.TRACE : environmentClientLogLevel
		});
	}

	private createServerPinoLogger(isDev: boolean = false): PinoLogger {
		if(isDev) {
			return pino({
				base: {
					runtime: "server",
					env: this.environmentRegistry.get("NODE_ENV"),
				},
				level: this.environmentRegistry.get("LOG_SERVER_LEVEL")
					|| this.environmentRegistry.get("LOG_LEVEL")
					|| LogLevel.INFO,
				transport: {
					options: {
						colorize: true
					},
					target: "pino-pretty"
				}
			});
		}
		const isFullNodeEnvironment = typeof process !== "undefined"
			&& (process as any)["release"]?.name === "node"
			&& typeof (process as any)["stdout"] !== "undefined";
		const logDestination = isFullNodeEnvironment
			? pino.destination({
				dest: (process["stdout"] as any)?.fd ?? 1,
				sync: true
			})
			: undefined;
		return pino(
			{
				level: LogLevel.INFO
			},
			logDestination
		);
	}

}

export default LoggerFactory;
