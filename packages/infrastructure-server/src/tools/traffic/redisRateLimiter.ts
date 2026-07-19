import { Ratelimit } from "@upstash/ratelimit";

import RedisClient from "./redisClient";

/**
 * Wrapper class managing concrete edge execution loops for Upstash rate limiting.
 *
 * Configures a localized Upstash sliding-window token bucket bucket instance tied to a custom
 * resource key prefix, executing rapid transaction checks against client tracking markers
 * directly at the runtime threshold.
 */
class RedisRateLimiter {
    private readonly limiterInstance: Ratelimit;

    constructor(
		redisClient: RedisClient,
		prefix: string,
		limitCount: number,
		windowDuration: string
	) {
        this.limiterInstance = new Ratelimit({
            redis: redisClient.connection,
            limiter: Ratelimit.slidingWindow(limitCount, windowDuration as any),
            prefix: prefix,
			analytics: true
        });
    }

    public async limit(identifier: string) {
        return await this.limiterInstance.limit(identifier);
    }
}

export default RedisRateLimiter;
