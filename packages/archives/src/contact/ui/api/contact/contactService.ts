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
		const validation = this.contactFormSchemaValidator.apply(params);

		if(!validation.success) {
			const isBot = validation.error.issues.some(issue => issue.path.includes("zipCode"));
			if(isBot) {
				return true;
			}

			throw ValidationError.Builder()
				.withErrors(validation.error.issues.map(issue => ({
					attribute: issue.path.join("."),
					errors: [issue.message]
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
