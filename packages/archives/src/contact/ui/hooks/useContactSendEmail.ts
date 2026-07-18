import { BaseError } from "@otuekong-portfolio/common";
import { useAsync } from "@otuekong-portfolio/curio";

import { ConfiguredContactService } from "../api";
import { ContactFormField, SendEmailApiHeaders } from "../types";

interface SendEmailResponse {
	emailError: BaseError | null;
	isEmailSending: boolean;
	isEmailSent: boolean;
	sendEmail: (emailData: ContactFormField) => void;
}

function useContactSendEmail(clientId: string, targetAppId: string): SendEmailResponse {
	const { data, error, execute, isLoading} = useAsync(async (emailData: ContactFormField) => {
		const headers = new Map<SendEmailApiHeaders, string>();
		headers.set("x-client-id", clientId);
		headers.set("x-target-app-id", targetAppId);

		return await ConfiguredContactService.sendEmail({
			contactInquiry: emailData,
			headers
		});
	}, {manual: true});

	return {
		emailError: error,
		isEmailSending: isLoading,
		isEmailSent: Boolean(data),
		sendEmail: execute
	};
}

export default useContactSendEmail;
