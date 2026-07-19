export interface RateLimitResult {
    limit: number;
	prefix: string;
    remaining: number;
    reset: number;
    success: boolean;
}

export const RedisEnvironmentVariable = Object.freeze({
	REST_URL: "UPSTASH_REDIS_REST_URL",
	REST_TOKEN: "UPSTASH_REDIS_REST_TOKEN"
} as const);

export type RedisEnvironmentKeys = typeof RedisEnvironmentVariable[keyof typeof RedisEnvironmentVariable];
