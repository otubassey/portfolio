import { ConfiguredSendEmailHandler } from "@otuekong-portfolio/archives";

import ContactServiceHandler from "./contactServiceHandler";

/**
 * Immutable Singleton ContactServiceHandler instance
 */
export const ConfiguredContactServiceHandler = new ContactServiceHandler(
	ConfiguredSendEmailHandler
);
