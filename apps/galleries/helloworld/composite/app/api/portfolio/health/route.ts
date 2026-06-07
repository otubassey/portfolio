import { NextRequest } from "next/server";

import { ConfiguredHealthServiceHandler } from "@otuekong-portfolio/exhibit";

/**
 * Enforces Next.js framework-level background cache revalidation (ISR).
 *
 * @description
 * Isolates external API quotas from user traffic spikes by serving statically
 * cached health metrics. Next.js runs the underlying live `SystemHealthHandler`
 * a maximum of twice a day (every 12 hours) asynchronously behind the scenes.
 *
 * @constant {number} revalidate - Cache lifespan window expressed in seconds.
 */
export const revalidate = 43200000;

export async function GET(request: NextRequest) {
	return ConfiguredHealthServiceHandler.sendHealthInquiry(request);
}
