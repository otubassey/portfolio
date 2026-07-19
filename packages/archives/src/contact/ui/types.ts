import { BaseError } from "@otuekong-portfolio/common";

export interface ContactFormField {
	name: string;
	email: string;
	message: string;
	zipCode: string;
}

export interface EmailHttpResponse {
	success: boolean;
	error: BaseError | null;
}

export type SendEmailApiHeaders = "x-client-id" | "x-target-app-id";
