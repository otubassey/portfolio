import {
	ConfigurationError,
	EnvironmentRegistry,
	OperationResult,
	ZodSchemaValidator,
	withSchemaValidation
} from "@otuekong-portfolio/common";
import {
	DomainService,
	ResendClient,
	WithRateLimitPreHook
} from "@otuekong-portfolio/infrastructure-server";

import { ContactFormField } from "../ui";

import { ContactModuleEnvironmentKeys } from "./types";

export interface SendEmailRequest extends ContactFormField {
	requestIp: string;
}

/**
 * Domain Service orchestrating inbound contact form data submissions.
 *
 * Executes an immutable validation and execution pipeline that performs bot-honeypot intercept
 * checks, strict Zod schema assertions, and sliding-window IP rate limiting before delivering
 * parameterized inquiry payloads to the injected Resend email transport driver.
 */
class SendEmailInquiryService implements DomainService<SendEmailRequest, OperationResult<null>> {
	constructor(
		private readonly environmentRegistry: EnvironmentRegistry<ContactModuleEnvironmentKeys>,
        private readonly resendClient: ResendClient,
		private readonly validator: ZodSchemaValidator<ContactFormField>,
		private readonly withRateLimitPreHook: WithRateLimitPreHook
    ) {
		const requiredParameters = Object.freeze({
			environmentRegistry,
			resendClient,
			validator,
			withRateLimitPreHook
		} as const);
		if(!Object.values(requiredParameters).some(Boolean)) {
			Object.entries(requiredParameters)
				.forEach(([param, value]) => {
					const formattedParam = `${param.charAt(0).toUpperCase()}${param.slice(1)}`;
					if(!value) {
						throw new ConfigurationError(
							"Domain Service Initialization Failed",
							`A valid ${formattedParam} driver instance must be supplied to construct the service.`
						);
					}
				});
		}
	}

	async execute(input: SendEmailRequest): Promise<OperationResult<null>> {
		const {requestIp, ...contactFormField} = input;
		const systemSenderEmail = this.environmentRegistry.get("PORTFOLIO_EMAIL_SENDER");

		const emailPipeline = this.resendClient.sendEmail()
			.withContext({
				sender: `Portfolio Contact <${systemSenderEmail}>`,
				subject: `Portfolio Inquiry from ${contactFormField.name}`,
				text: contactFormField.message,
				origin: systemSenderEmail,
				target: "", // Target is filled securely behind the scenes by the ResendClient
				html: `<p><strong>Name:</strong> ${contactFormField.name}</p>
					<p><strong>Email:</strong> ${contactFormField.email}</p>
					<p><strong>Message:</strong></p>
					<p>${contactFormField.message}</p>`
			})
			.before(
				this.withRateLimitPreHook(requestIp, "contact-email-submission", 3, "1h")
			)
			.before(
				withSchemaValidation(this.validator, contactFormField, (validatorResult) => {
					if(!validatorResult.isValid) {
						const isBot = validatorResult.error.errors.some(validationError => (
							validationError.attribute?.includes("zipCode")
						));
						if(isBot && input?.zipCode?.trim() !== "") {
							return {
								action: "SHORT_CIRCUIT",
								response: {
									status: 204,
									data: null
								}
							};
						}
					}
					return { action: "NO_OP" };
				})
			);

		const pipelineExecutionResult = await emailPipeline.execute();

        if(!pipelineExecutionResult.success && pipelineExecutionResult.error) {
            return {
				data: null,
                error: pipelineExecutionResult.error,
                success: false
            };
        }

		return {
			data: null,
			error: null,
            success: true
        };
	}
}

export default SendEmailInquiryService;
