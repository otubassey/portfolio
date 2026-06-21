import { EnvironmentRegistry, ZodSchemaValidator } from "@otuekong-portfolio/common";
import { ResendClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { ContactFormSchema } from "./core";
import { SendEmailHandler } from "./server";
import { ContactModuleEnvironmentKeys } from "./types";

interface ContactModuleParameters {
	environmentRegistry: EnvironmentRegistry<ContactModuleEnvironmentKeys>;
	resendClient: ResendClient;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class ContactModule {
	private sendEmailHandler: SendEmailHandler | null = null;

	constructor(private readonly parameters: ContactModuleParameters) {}

	public getSendEmailHandler(): SendEmailHandler {
		if(!this.sendEmailHandler) {
			this.sendEmailHandler = new SendEmailHandler(
				this.parameters.environmentRegistry,
				this.parameters.resendClient,
				new ZodSchemaValidator(ContactFormSchema),
				this.parameters.withRateLimitPreHook
			);
		}
		return this.sendEmailHandler;
	}
}

export default ContactModule;
