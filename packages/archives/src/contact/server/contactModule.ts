import { EnvironmentRegistry, ZodSchemaValidator } from "@otuekong-portfolio/common";
import { HttpController, ResendClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { ContactFormSchema } from "../core";

import SendEmailInquiryController from "./sendEmailInquiryController";
import SendEmailInquiryService from "./sendEmailInquiryService";
import { ContactModuleEnvironmentKeys } from "./types";

interface ContactModuleParameters {
	appName: string;
	environmentRegistry: EnvironmentRegistry<ContactModuleEnvironmentKeys>;
	resendClient: ResendClient;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class ContactModule {
	private controllers: ReadonlyArray<HttpController> | null = null;
	private sendEmailInquiryController: SendEmailInquiryController | null = null;
	private sendEmailInquiryService: SendEmailInquiryService | null = null;

	constructor(private readonly parameters: ContactModuleParameters) {}

	public getHttpControllers(): ReadonlyArray<HttpController> {
		if(!this.controllers) {
			const sendEmailInquiryController = this.getSendEmailInquiryController();
			this.controllers = [sendEmailInquiryController];
		}
		return this.controllers;
	}

	public getSendEmailInquiryController(): SendEmailInquiryController {
		if(!this.sendEmailInquiryController) {
			const sendEmailInquiryService = this.getSendEmailInquiryService();
			this.sendEmailInquiryController = new SendEmailInquiryController(
				this.parameters.appName,
				sendEmailInquiryService
			);
		}
		return this.sendEmailInquiryController;
	}

	public getSendEmailInquiryService(): SendEmailInquiryService {
		if(!this.sendEmailInquiryService) {
			this.sendEmailInquiryService = new SendEmailInquiryService(
				this.parameters.environmentRegistry,
				this.parameters.resendClient,
				new ZodSchemaValidator(ContactFormSchema),
				this.parameters.withRateLimitPreHook
			);
		}
		return this.sendEmailInquiryService;
	}
}

export default ContactModule;
