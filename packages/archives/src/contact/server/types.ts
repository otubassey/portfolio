const SendEmailInquiryEnvironmentVariable = Object.freeze({
	EMAIL_SENDER: "PORTFOLIO_EMAIL_SENDER"
} as const);

export type ContactModuleEnvironmentKeys = typeof SendEmailInquiryEnvironmentVariable[keyof typeof SendEmailInquiryEnvironmentVariable];
