import { EnvironmentRegistry, LoggerProvider } from "@otuekong-portfolio/common";

import {
	RateLimiterFactory,
	RedisClientModule,
	RedisEnvironmentKeys,
	ResendClientModule,
	ResendEnvironmentKeys,
	SystemHealthClient,
	WithRateLimitPreHook,
	withRateLimitFactory
} from "./tools";
import { ServerComponentMonitor } from "./types";

export type InfrastructureServerModuleEnvironmentKeys = RedisEnvironmentKeys | ResendEnvironmentKeys;

interface InfrastructureServerModuleParameters {
	environmentRegistry: EnvironmentRegistry<InfrastructureServerModuleEnvironmentKeys>;
	loggerProvider: LoggerProvider;
}

class InfrastructureServerModule {
	private rateLimiterFactory: RateLimiterFactory | null = null;
	private redisClientModule: RedisClientModule | null = null;
	private resendClientModule: ResendClientModule | null = null;
	private systemHealthClient: SystemHealthClient | null = null;
	private withRateLimit: WithRateLimitPreHook | null = null;

	constructor(private readonly parameters: InfrastructureServerModuleParameters) {}

	private getRateLimiterFactory(): RateLimiterFactory {
		if(!this.rateLimiterFactory) {
			const redisClientModule = this.getRedisClientModule();

			this.rateLimiterFactory = new RateLimiterFactory(
				redisClientModule.getRedisClient()
			);
		}
		return this.rateLimiterFactory;
	}

	public getRedisClientModule(): RedisClientModule {
		if(!this.redisClientModule) {
			this.redisClientModule = new RedisClientModule({
				environmentRegistry: (
					this.parameters.environmentRegistry as EnvironmentRegistry<RedisEnvironmentKeys>
				),
				loggerProvider: this.parameters.loggerProvider
			});
		}
		return this.redisClientModule;
	}

	public getResendClientModule(): ResendClientModule {
		if(!this.resendClientModule) {
			this.resendClientModule = new ResendClientModule({
				environmentRegistry: (
					this.parameters.environmentRegistry as EnvironmentRegistry<ResendEnvironmentKeys>
				),
				loggerProvider: this.parameters.loggerProvider
			});
		}
		return this.resendClientModule;
	}

	public getSystemHealthClient(): SystemHealthClient {
		if(!this.systemHealthClient) {
			const redisClientModule = this.getRedisClientModule();
			const resendClientModule = this.getResendClientModule();

			const serverComponentMonitorMapping = new Map<string, ServerComponentMonitor>([
				["redis", redisClientModule.getRedisClient()] as const,
				["resend", resendClientModule.getResendClient()] as const
			]);

			this.systemHealthClient = new SystemHealthClient(
				serverComponentMonitorMapping
			);
		}
		return this.systemHealthClient;
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
}

export default InfrastructureServerModule;
