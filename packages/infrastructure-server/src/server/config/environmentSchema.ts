import Zod from "zod";

import { ZodSchemaValidator } from "@otuekong-portfolio/common";

export const EnvironmentSchema = Zod.object({
	CONTACT_FORM_RECIPIENT_EMAIL: Zod.string()
		.trim()
		.pipe(
			Zod.email("Please enter a valid email address")
		),
	RESEND_API_KEY: Zod.string()
		.trim()
		.min(1, "RESEND_API_KEY is required"),
	SYSTEM_SENDER_EMAIL: Zod.string()
		.trim()
		.pipe(
			Zod.email("Please enter a valid email address")
		),
	UPSTASH_REDIS_REST_TOKEN: Zod.string()
		.trim()
		.min(1, "Redis token is required"),
	UPSTASH_REDIS_REST_URL: Zod.string()
		.trim()
		.pipe(Zod.url("Invalid Redis URL"))
});

export type EnvironmentSchemaType = Zod.infer<typeof EnvironmentSchema>;

export type EnvironmentVariable = keyof EnvironmentSchemaType;

export const EnvironmentSchemaValidator = new ZodSchemaValidator(EnvironmentSchema);

export type EnvironmentSchemaValidatorType = typeof EnvironmentSchemaValidator;
