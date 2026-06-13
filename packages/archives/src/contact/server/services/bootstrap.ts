import { ZodSchemaValidator, EnvironmentRegistry } from "@otuekong-portfolio/common";
import { ConfiguredResendClient } from "@otuekong-portfolio/infrastructure-server";

import { ContactFormSchema } from "../../core";

import SendEmailHandler from "./sendEmailHandler";

export const ConfiguredSendEmailHandler = new SendEmailHandler(
	ConfiguredResendClient,
	new ZodSchemaValidator(ContactFormSchema),
	EnvironmentRegistry
);
