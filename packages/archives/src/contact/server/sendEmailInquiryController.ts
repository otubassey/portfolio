import { BadRequestError } from "@otuekong-portfolio/common/errors";
import { HttpController, HttpRequest, HttpResponse } from "@otuekong-portfolio/infrastructure-server/core";

import { ContactFormField } from "../ui";

import SendEmailInquiryService from "./sendEmailInquiryService";

class SendEmailInquiryController extends HttpController {
    constructor(
		appName: string,
        private readonly sendEmailInquiryService: SendEmailInquiryService
    ) {
        super(appName, "portfolio");

        this.registerRoute("POST", "/contact/v1/email/send", (req) => this.handleSendEmail(req));
    }

	private async handleSendEmail(request: HttpRequest): Promise<HttpResponse> {
		const payload = request.body as ContactFormField;

		if(!payload) {
            return {
                status: 400,
                data: null,
				error: BadRequestError.Builder()
					.withMessage("Missing required core payload elements.")
					.build()
            };
        }

		const serviceResult = await this.sendEmailInquiryService.execute({
			...payload,
			requestIp: request.ip ?? ""
		});

		if(serviceResult.error) {
			return {
				status: 500,
				data: null,
				error: serviceResult.error
			};
		}

		return {
            status: 204,
            data: null,
            error: null
        };
	}
}

export default SendEmailInquiryController;
