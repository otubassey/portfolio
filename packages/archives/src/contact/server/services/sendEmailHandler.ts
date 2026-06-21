import {
	ConfigurationError,
	EnvironmentRegistry,
	withSchemaValidation,
	ZodSchemaValidator
} from "@otuekong-portfolio/common";
import {
	HttpRequest,
	HttpResponse,
	ResendClient,
	ResourceHandler,
	WithRateLimitPreHook
} from "@otuekong-portfolio/infrastructure-server";

import { ContactFormField } from "../../ui";

import { SendEmailHandlerEnvironmentKeys } from "./types";

/**
 * Resource handler orchestrating inbound contact form data submissions.
 *
 * Executes an immutable validation and execution pipeline that performs bot-honeypot intercept
 * checks, strict Zod schema assertions, and sliding-window IP rate limiting before delivering
 * parameterized inquiry payloads to the injected Resend email transport driver.
 */
class SendEmailHandler implements ResourceHandler<ContactFormField, { success: boolean }> {

    constructor(
		private readonly environmentRegistry: EnvironmentRegistry<SendEmailHandlerEnvironmentKeys>,
        private readonly resendClient: ResendClient,
		private readonly validator: ZodSchemaValidator<ContactFormField>,
		private readonly withRateLimitPreHook: WithRateLimitPreHook
    ) {
		const requiredParameters = {
			environmentRegistry,
			resendClient,
			validator,
			withRateLimitPreHook
		} as const;
		if(!Object.values(requiredParameters).some(Boolean)) {
			Object.entries(requiredParameters)
				.forEach(([param, value]) => {
					const formattedParam = `${param.charAt(0).toUpperCase()}${param.slice(1)}`;
					if(!value) {
						throw new ConfigurationError(
							"Resource Handler Initialization Failed",
							`A valid ${formattedParam} must be supplied to construct the SendEmailHandler.`
						);
					}
				});
		}
	}

    public async handle(
        request: HttpRequest<ContactFormField>
    ): Promise<HttpResponse<{ success: boolean }>> {
		const formField = request.body;
		const systemSenderEmail = this.environmentRegistry.get("PORTFOLIO_EMAIL_SENDER");

		const emailPipeline = this.resendClient.sendEmail()
			.withContext({
				sender: `Portfolio Contact <${systemSenderEmail}>`,
				subject: `Portfolio Inquiry from ${formField.name}`,
				text: formField.message,
				origin: systemSenderEmail,
				target: "", // Target is filled securely behind the scenes by the ResendClient
				html: `<p><strong>Name:</strong> ${formField.name}</p>
					<p><strong>Email:</strong> ${formField.email}</p>
					<p><strong>Message:</strong></p>
					<p>${formField.message}</p>`
			})
			.before(
				this.withRateLimitPreHook(request?.ip, "contact-email-submission", 3, "1h")
			)
			.before(
				withSchemaValidation(this.validator, formField, (validatorResult) => {
					if(!validatorResult.isValid) {
						const isBot = validatorResult.errors.some(validationError => (
							validationError.path.includes("zipCode")
						));
						if(isBot && formField?.zipCode?.trim() !== "") {
							return {
								action: "SHORT_CIRCUIT",
								response: {
									status: 200,
									data: {
										success: true
									}
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
                status: (pipelineExecutionResult.error as any).statusCode || 500,
                error: pipelineExecutionResult.error,
				headers: (pipelineExecutionResult.error as any).headers
            };
        }

        return {
            status: 200,
            data: { success: true },
            headers: new Map([["Cache-Control", "no-store"]])
        };
    }
}

export default SendEmailHandler;
