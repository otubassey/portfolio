import { ConfigurationError } from "@otuekong-portfolio/common";

import RedisClient from "./redisClient";
import RedisRateLimiter from "./redisRateLimiter";

/**
 * Central state factory responsible for instantiating and caching resource limiters.
 *
 * Consumes an injected core RedisClient driver container instance to construct isolated
 * RedisRateLimiter instances, standardizing sliding-window request threshold configurations
 * across discrete edge API routing entry points.
 */
class RateLimiterFactory {

	constructor(private readonly redisClient: RedisClient) {
        if(!redisClient) {
            throw new ConfigurationError(
                "Rate Limiter Initialization Failed",
                "A valid RedisClient container instance must be provided to assemble a RateLimiterFactory."
            );
        }
	}

	public create(
		prefix: string,
		limit: number,
		window: string
	): RedisRateLimiter {
        return new RedisRateLimiter(this.redisClient, prefix, limit, window);
    }

}

export default RateLimiterFactory;
