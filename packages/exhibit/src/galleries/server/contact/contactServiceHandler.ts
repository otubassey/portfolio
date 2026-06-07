import { NextRequest } from "next/server";

import { ConfigurationError } from "@otuekong-portfolio/common";
import { ConfiguredSendEmailHandler } from "@otuekong-portfolio/features";

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

	public sendEmailInquiry = (request: NextRequest) => {
        return createNextRoute(this.sendEmailInquiryHandler)(request);
    };
}

export default ContactServiceHandler;
