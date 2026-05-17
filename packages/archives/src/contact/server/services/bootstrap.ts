import { ZodSchemaValidator } from "@otuekong-portfolio/common";
import { ConfiguredResendClient, EnvironmentRegistry } from "@otuekong-portfolio/infrastructure-server";

import { ContactFormSchema } from "../../core";

import SendEmailHandler from "./sendEmailHandler";

export const ConfiguredSendEmailHandler = new SendEmailHandler(
	ConfiguredResendClient,
	new ZodSchemaValidator(ContactFormSchema),
	EnvironmentRegistry
);
