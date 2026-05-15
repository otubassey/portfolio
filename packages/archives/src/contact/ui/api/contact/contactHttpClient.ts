import { HttpClient, OperationPipeline, FalloutError } from "@otuekong-portfolio/common";

import { ContactFormField, EmailHttpResponse } from "../../types";

class ContactHttpClient extends HttpClient {
    public sendEmail(
        endpointUrl: string,
        data: ContactFormField
    ): OperationPipeline<any, Response, EmailHttpResponse> {
        return this.open()
			.post(endpointUrl)
			.body(data)
			.pipe()
			.after(async (response: Response): Promise<EmailHttpResponse> => {
				if(!response.ok) {
					const errorBody = await response.json().catch(() => ({}));

					const error = new FalloutError(
						errorBody?.message || `Transport failure: ${response.statusText}`,
						errorBody?.detail || "The downstream server rejected the request parameters.",
						response.status
					);

					return {
						success: false,
						error
					};
				}
				return {
					success: response.ok,
					error: null
				};
			});
    }
}

export default ContactHttpClient;
