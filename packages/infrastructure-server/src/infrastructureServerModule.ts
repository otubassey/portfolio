import { LoggerProvider } from "@otuekong-portfolio/common";

import { RateLimiterFactory, RedisClient, withRateLimitFactory, WithRateLimitPreHook } from "./redis/";
import { SystemHealthClient, SystemHealthHandler } from "./server";
import { ServerComponentMonitor } from "./types";

interface InfrastructureServerModuleParameters {
	loggerProvider: LoggerProvider;
	redisClient: RedisClient;
	serverComponentMonitorMapping: Map<string, ServerComponentMonitor>;
}

class InfrastructureServerModule {
	private rateLimiterFactory: RateLimiterFactory | null = null;
	private systemHealthHandler: SystemHealthHandler | null = null;
	private withRateLimit: WithRateLimitPreHook | null = null;

	constructor(private readonly parameters: InfrastructureServerModuleParameters) {}

	public getSystemHealthHandler(): SystemHealthHandler {
		if(!this.systemHealthHandler) {
			const systemHealthClient = new SystemHealthClient(
				this.parameters.serverComponentMonitorMapping
			);
			const withRateLimit = this.getWithRateLimit();
			this.systemHealthHandler = new SystemHealthHandler(
				systemHealthClient,
				withRateLimit
			);
		}
		return this.systemHealthHandler;
	}

	public getWithRateLimit(): WithRateLimitPreHook {
		if(!this.withRateLimit) {
			const rateLimiterFactory = this.getRateLimiterFactory();
			this.withRateLimit = withRateLimitFactory(
				rateLimiterFactory
			);
		}
		return this.withRateLimit;
	}

	private getRateLimiterFactory(): RateLimiterFactory {
		if(!this.rateLimiterFactory) {
			this.rateLimiterFactory = new RateLimiterFactory(
				this.parameters.redisClient
			);
		}
		return this.rateLimiterFactory;
	}
}

export default InfrastructureServerModule;
