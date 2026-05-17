import {
	ConfigurationError,
	withSchemaValidation,
	ZodSchemaValidator
} from "@otuekong-portfolio/common";
import {
	ConfiguredResendClient,
	EnvironmentRegistry,
	HttpRequest,
	HttpResponse,
	ResourceHandler,
	withRateLimit
} from "@otuekong-portfolio/infrastructure-server";

import { ContactFormField } from "../../ui";

/**
 * Resource handler orchestrating inbound contact form data submissions.
 *
 * Executes an immutable validation and execution pipeline that performs bot-honeypot intercept
 * checks, strict Zod schema assertions, and sliding-window IP rate limiting before delivering
 * parameterized inquiry payloads to the injected Resend email transport driver.
 */
class SendEmailHandler implements ResourceHandler<ContactFormField, { success: boolean }> {

    constructor(
        private readonly resendClient: typeof ConfiguredResendClient,
		private readonly validator: ZodSchemaValidator<ContactFormField>,
		private readonly environmentRegistry: typeof EnvironmentRegistry
    ) {
		if(!resendClient) {
            throw new ConfigurationError(
                "Resource Handler Initialization Failed",
                "A valid ResendClient driver instance must be supplied to construct the SendEmailHandler."
            );
        }
		if(!validator) {
            throw new ConfigurationError(
                "Resource Handler Initialization Failed",
                "A valid ZodSchemaValidator engine instance must be supplied to construct the SendEmailHandler."
            );
        }
		if(!environmentRegistry) {
            throw new ConfigurationError(
                "Resource Handler Initialization Failed",
                "A valid EnvironmentRegistry must be supplied to construct the SendEmailHandler."
            );
        }
	}

    public async handle(
        request: HttpRequest<ContactFormField>
    ): Promise<HttpResponse<{ success: boolean }>> {
		const formField = request.body;
		const systemSenderEmail = this.environmentRegistry.SYSTEM_SENDER_EMAIL;

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
				withRateLimit(request?.ip, "contact-email-submission", 3, "1h")
			)
			.before(
				withSchemaValidation(this.validator, formField, (result) => {
					if(!result.success) {
						const isBot = result.error.issues.some(issue => issue.path.includes("zipCode"));
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

        const pipelineResult = await emailPipeline.execute();

        if(!pipelineResult.success && pipelineResult.error) {
            return {
                status: (pipelineResult.error as any).statusCode || 500,
                error: pipelineResult.error,
				headers: (pipelineResult.error as any).headers
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
