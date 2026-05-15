import { ConfiguredSendEmailHandler } from "@otuekong-portfolio/features";

import ContactServiceHandler from "./contactServiceHandler";

/**
 * Immutable Singleton ContactServiceHandler instance
 */
export const ConfiguredContactServiceHandler = new ContactServiceHandler(
	ConfiguredSendEmailHandler
);
