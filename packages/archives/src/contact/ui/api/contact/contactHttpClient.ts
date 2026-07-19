import { HttpClient, OperationPipeline, OperationResult } from "@otuekong-portfolio/common";

import { ContactFormField, EmailHttpResponse, SendEmailApiHeaders } from "../../types";

class ContactHttpClient extends HttpClient {
    public sendEmail(
        endpointUrl: string,
		headers: Map<SendEmailApiHeaders, string>,
        data: ContactFormField
    ): OperationPipeline<any, OperationResult<null>, EmailHttpResponse> {
		const httpBuilder = this.open<OperationResult<null>>();

		if(headers.has("x-client-id")) {
			httpBuilder.header("x-client-id", headers.get("x-client-id") ?? "");
		}

		if(headers.has("x-target-app-id")) {
			httpBuilder.header("x-target-app-id", headers.get("x-target-app-id") ?? "");
		}

        return httpBuilder
			.post(endpointUrl)
			.body(data)
			.pipe()
			.after(async (response: OperationResult<null>): Promise<EmailHttpResponse> => {
				if(response.error) {
					return {
						success: false,
						error: response.error
					};
				}
				return {
					success: response.success,
					error: null
				};
			});
    }
}

export default ContactHttpClient;
