import { Redis } from "@upstash/redis";

import {
	ConfigurationError,
	DeferredOperationBuilder,
	EnvironmentRegistry,
	LoggerProvider,
	OperationResult,
	ServerComponentClient
} from "@otuekong-portfolio/common";

import { ServerComponentHealth, ServerComponentMonitor } from "../../types";

import { RedisEnvironmentKeys } from "./types";

/**
 * Isolated server-only interface managing connection lifecycles to Upstash Redis.
 *
 * Eagerly injects validated environment configurations, abstracts raw connection pools behind
 * an internal singleton lazy-getter instance, and implements telemetry contracts to expose
 * real-time latency diagnostics for automated platform monitoring.
 */
class RedisClient extends ServerComponentClient implements ServerComponentMonitor {
	private readonly CONFIGURATION_ERROR_MESSAGE = "Vault connection failed";

	private readonly logger;

	private client: Redis | null = null;

	constructor(
		private readonly environmentRegistry: EnvironmentRegistry<RedisEnvironmentKeys>,
		private readonly loggerProvider: LoggerProvider
	) {
		super();

        if(!environmentRegistry) {
            throw new ConfigurationError(this.CONFIGURATION_ERROR_MESSAGE, "Missing environment registry.");
        }

        if(!loggerProvider) {
            throw new ConfigurationError(this.CONFIGURATION_ERROR_MESSAGE, "Missing LoggerProvider.");
        }

		this.logger = this.loggerProvider.getLogger("RedisClient");
	}

	public get connection(): Redis {
        if(!this.client) {
            this.client = new Redis({
                url: this.environmentRegistry.get("UPSTASH_REDIS_REST_URL"),
                token: this.environmentRegistry.get("UPSTASH_REDIS_REST_TOKEN")
            });
        }
        return this.client;
	}

	health(): DeferredOperationBuilder<ServerComponentHealth> {
		let startTime: number;

        return this.create(async (): Promise<OperationResult<ServerComponentHealth>> => {
			try {
				startTime = performance.now();
				const response = await this.connection.ping();

				if(!response || response !== "PONG") {
					throw new Error("No pong received");
				}

				return {
					success: true,
					data: {
						isHealthy: true,
						latencyMs: Math.round(performance.now() - startTime),
						timestamp: new Date().toISOString()
					},
					error: null
				};
			} catch (error) {
				this.logger.error("[Redis diagnostics failed]:", (error as Error));

				return {
					// Graceful operational capture prevents pipeline termination crashes
					success: true,
					data: {
						isHealthy: false,
						latencyMs: Math.round(performance.now() - startTime),
						timestamp: new Date().toISOString()
					},
					error: null
				};
			}
        });
	}

}

export default RedisClient;
