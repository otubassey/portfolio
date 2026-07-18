import { ConfigurationError, ZodSchemaValidator } from "@otuekong-portfolio/common";

import { ContactFormField, SendEmailApiHeaders } from "../../types";

import ContactHttpClient from "./contactHttpClient";

interface SendEmailParameters {
	headers: Map<SendEmailApiHeaders, string>;
	contactInquiry: ContactFormField;
}

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

    async sendEmail(params: SendEmailParameters): Promise<boolean> {
		const validation = this.contactFormSchemaValidator.validate(params.contactInquiry);

		if(!validation.isValid) {
			const isBot = validation.error.errors
				.some(validationError => validationError.attribute?.includes("zipCode"));

			if(isBot) {
				return true;
			}

			throw validation.error;
		}

		// TODO: things to consider
		// 1. try to reduce the passed links to one for client and one for api or setup #2 below
		// 2. setup hateoas GET /entrypoint for these links
		// 3. passing logger where needed
        const response = await this.contactHttpClient
			.sendEmail("/api/portfolio/contact/v1/email/send", params.headers, validation.data)
			.execute();

		if(!response.success) {
			throw response.error;
		}

        return response.success;
    }
}

export default ContactService;
