import { ConfiguredSendEmailHandler } from "@otuekong-portfolio/archives";
import { ConfigurationError } from "@otuekong-portfolio/common";

import { createNextRoute } from "../../../common";

type SendEmailHandler = typeof ConfiguredSendEmailHandler;

class ContactServiceHandler {
    constructor(
        private readonly sendEmailInquiryHandler: SendEmailHandler
    ) {
		if(!sendEmailInquiryHandler) {
			throw new ConfigurationError(
				"Resource Handler Initialization Failed",
				"A valid SendEmailHandler instance must be supplied to construct the ContactServiceHandler."
			);
		}
	}

	public sendEmailInquiry = () => {
        return createNextRoute(this.sendEmailInquiryHandler);
    };
}

export default ContactServiceHandler;
