import { EnvironmentRegistry, LoggerProvider } from "@otuekong-portfolio/common";

import RedisClient from "./redisClient";
import { RedisEnvironmentKeys } from "./types";

interface RedisClientModuleParameters {
	environmentRegistry: EnvironmentRegistry<RedisEnvironmentKeys>;
	loggerProvider: LoggerProvider;
}

class RedisClientModule {
	private redisClient: RedisClient | null = null;

	constructor(private readonly parameters: RedisClientModuleParameters) {}

	public getRedisClient(): RedisClient {
		if(!this.redisClient) {
			this.redisClient = new RedisClient(
				this.parameters.environmentRegistry,
				this.parameters.loggerProvider
			);
		}
		return this.redisClient;
	}
}

export default RedisClientModule;
