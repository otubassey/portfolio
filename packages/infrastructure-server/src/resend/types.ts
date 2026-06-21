export const ResendEnvironmentVariable = {
	API_KEY: "RESEND_API_KEY",
	EMAIL_TARGET: "PORTFOLIO_EMAIL_TARGET"
} as const;

export type ResendEnvironmentKeys = typeof ResendEnvironmentVariable[keyof typeof ResendEnvironmentVariable];
