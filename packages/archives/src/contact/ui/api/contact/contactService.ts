import { ConfigurationError, ValidationError, ZodSchemaValidator } from "@otuekong-portfolio/common";

import { ContactFormField } from "../../types";

import ContactHttpClient from "./contactHttpClient";

class ContactService {
    constructor(
        private readonly contactFormSchemaValidator: ZodSchemaValidator<any>,
        private readonly contactHttpClient: ContactHttpClient
    ) {
		if(!contactFormSchemaValidator) {
            throw new ConfigurationError(
                "Service Initialization Failed",
                "A valid ZodSchemaValidator configuration engine must be supplied to construct the ContactService."
            );
        }

        if(!contactHttpClient) {
            throw new ConfigurationError(
                "Service Initialization Failed",
                "A valid ContactHttpClient transport driver instance must be supplied to construct the ContactService."
            );
        }
	}

    async sendEmail(params: ContactFormField): Promise<boolean> {
		const validation = this.contactFormSchemaValidator.validate(params);

		if(!validation.isValid) {
			const isBot = validation.errors
				.some(validationError => validationError.path.includes("zipCode"));
			if(isBot) {
				return true;
			}

			throw ValidationError.Builder()
				.withErrors(validation.errors.map(validationError => ({
					attribute: validationError.path,
					errors: [validationError.message]
				})))
				.build();
		}

        const response = await this.contactHttpClient
			.sendEmail("/api/portfolio/contact/v1/email/send", validation.data)
			.execute();

		if(!response.success) {
			throw response.error;
		}

        return response.success;
    }
}

export default ContactService;
