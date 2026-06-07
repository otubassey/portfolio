import { NextRequest } from "next/server";

import { ConfigurationError } from "@otuekong-portfolio/common";
import { ConfiguredSystemHealthHandler } from "@otuekong-portfolio/infrastructure-server";

import createNextRoute from "../createNextRoute";

class HealthServiceHandler {
    constructor(
        private readonly sendHealthInquiryHandler: typeof ConfiguredSystemHealthHandler
    ) {
		if(!sendHealthInquiryHandler) {
			throw new ConfigurationError(
				"Resource Handler Initialization Failed",
				"A valid SendHealthHandler instance must be supplied to construct the HealthServiceHandler."
			);
		}
	}

	public sendHealthInquiry = (request: NextRequest) => {
        return createNextRoute(this.sendHealthInquiryHandler)(request);
    };
}

export default HealthServiceHandler;
