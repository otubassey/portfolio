import { RateLimiterFactory, RedisClient, withRateLimitFactory } from "./redis";
import { ResendClient } from "./resend";
import { EnvironmentRegistry, SystemHealthClient, SystemHealthHandler } from "./server";
import { ServerComponentMonitor } from "./types";

/**
 * Single, immutable global instance deployed across all application scopes.
 */
export const ConfiguredRedisClient = new RedisClient(
	EnvironmentRegistry
);

export const ConfiguredRateLimiterFactory = RateLimiterFactory.getInstance(ConfiguredRedisClient);

export const withRateLimit = withRateLimitFactory(ConfiguredRateLimiterFactory);

/**
 * Single, immutable global instance deployed across all application scopes.
 */
export const ConfiguredResendClient = new ResendClient(
	EnvironmentRegistry
);

const monitorMap = new Map<string, ServerComponentMonitor>([
    ["redis", ConfiguredRedisClient] as const,
    ["resend", ConfiguredResendClient] as const
]);

export const ConfiguredSystemHealthClient = new SystemHealthClient(monitorMap);

/**
 * Immutable Singleton monitoring instance ready for diagnostic route deployment
 */
export const ConfiguredSystemHealthHandler = new SystemHealthHandler(ConfiguredSystemHealthClient, withRateLimit);
