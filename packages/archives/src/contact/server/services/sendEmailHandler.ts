import {
	ConfigurationError,
	EnvironmentRegistry,
	withSchemaValidation,
	ZodSchemaValidator
} from "@otuekong-portfolio/common";
import {
	ConfiguredResendClient,
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
