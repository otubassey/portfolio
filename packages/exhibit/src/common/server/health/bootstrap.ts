import { ConfiguredSystemHealthHandler } from "@otuekong-portfolio/infrastructure-server";

import HealthServiceHandler from "./healthServiceHandler";

/**
 * Immutable Singleton HealthServiceHandler instance
 */
export const ConfiguredHealthServiceHandler = new HealthServiceHandler(
	ConfiguredSystemHealthHandler
);

