import { BaseError } from "@otuekong-portfolio/common";
import { useAsync } from "@otuekong-portfolio/curio";

import { ConfiguredContactService } from "../api";
import { ContactFormField } from "../types";

interface SendEmailResponse {
	emailError: BaseError | null;
	isEmailSending: boolean;
	isEmailSent: boolean;
	sendEmail: (emailData: ContactFormField) => void;
}

function useContactSendEmail(): SendEmailResponse {
	const result = useAsync(async (emailData: ContactFormField) => (
		await ConfiguredContactService.sendEmail(emailData)
	), {manual: true});

	return {
		emailError: result.error,
		isEmailSending: result.isLoading,
		isEmailSent: Boolean(result.data),
		sendEmail: result.execute
	};
}

export default useContactSendEmail;
