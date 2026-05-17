import { ConfigurationError, PipelineContext, PipelineDirective, PreHook, TooManyRequestsError } from "@otuekong-portfolio/common";

import RateLimiterFactory from "../rateLimiterFactory";

import { WithRateLimitPreHook } from "./types";

/**
 * Higher-order functional decorator factory that generates type-safe pipeline pre-hooks.
 *
 * Consumes a pre-configured RateLimiterFactory to yield sliding-window rate limit interceptors
 * that inspect incoming client identifiers, short-circuiting over-threshold request threads by
 * throwing structured TooManyRequestsError exceptions.
 */
const withRateLimitFactory = (
	configuredRateLimiterFactory: RateLimiterFactory
): WithRateLimitPreHook => {
	if(!configuredRateLimiterFactory) {
		throw new ConfigurationError(
			"Rate Limiter Decorator Initialization Failed",
			"The withRateLimitFactory requires a valid, pre-configured RateLimiterFactory instance to decorate the operation pipeline."
		);
	}

	return <Context extends PipelineContext>(
		identifier: string | undefined | null,
		prefix: string,
		limit = 3,
		window: any = "1h"
	): PreHook<Context> => {
		return async (context: Context): Promise<PipelineDirective<Context>> => {
			const safeIdentifier = Boolean(identifier?.trim())
				? identifier
				: "127.0.0.1";

			const limiter = configuredRateLimiterFactory.create(prefix, limit, window);

			const {
				success,
				limit: maxRequestAllowedWithinWindow,
				remaining,
				reset
			} = await limiter.limit(safeIdentifier!);

			if(!success) {
				throw TooManyRequestsError.Builder()
					.withLimit(maxRequestAllowedWithinWindow)
					.withRemaining(remaining)
					.withReset(reset)
					.withDetail(`Rate limit exceeded for resource: ${prefix}`)
					.build();
			}

			return {
                action: "CONTINUE",
                context
            };
		};
	};
}

export default withRateLimitFactory;
