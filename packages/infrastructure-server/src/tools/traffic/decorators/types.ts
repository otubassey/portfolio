import { PipelineContext, PreHook } from "@otuekong-portfolio/common";

export type WithRateLimitPreHook = <Context extends PipelineContext>(
	identifier: string | undefined | null,
	prefix: string,
	limit?: number,
	window?: any
) => PreHook<Context>;
