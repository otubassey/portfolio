import Zod from "zod";

import { LogLevel, NodeEnvironment } from "../constants";
import { emailSchemaFactory } from "../schemas";
import { Validator, ZodSchemaValidator } from "../validators";

const LogLevelZodEnum = Zod.enum(Object.values(LogLevel))
	.default(LogLevel.INFO);

export const EnvironmentSchema = Zod.object({
	CLIENT_LOG_LEVEL: LogLevelZodEnum.optional(),
	CONTACT_FORM_RECIPIENT_EMAIL: emailSchemaFactory(
		"Please enter a valid receipient email address"
	),
	LOG_LEVEL: LogLevelZodEnum,
	NODE_ENV: Zod.enum(Object.values(NodeEnvironment))
		.default(NodeEnvironment.PROD),
	RESEND_API_KEY: Zod.string()
		.trim()
		.min(1, "RESEND_API_KEY is required"),
	SERVER_LOG_LEVEL: LogLevelZodEnum.optional(),
	SYSTEM_SENDER_EMAIL: emailSchemaFactory(
		"Please enter a valid sender email address"
	),
	UPSTASH_REDIS_REST_TOKEN: Zod.string()
		.trim()
		.min(1, "Redis token is required"),
	UPSTASH_REDIS_REST_URL: Zod.string()
		.trim()
		.pipe(Zod.url("Invalid Redis URL"))
});

type EnvironmentSchemaType = Zod.infer<typeof EnvironmentSchema>;

export type EnvironmentVariable = keyof EnvironmentSchemaType;

type EnvironmentKeyValidatorFactory<T extends Record<string, any>> =
  <K extends keyof T>(key: K) => Validator<T[K]>;

export const EnvironmentSchemaValidatorFactory: EnvironmentKeyValidatorFactory<EnvironmentSchemaType> =
	<K extends keyof EnvironmentSchemaType>(key: K) => (
		new ZodSchemaValidator<any>(EnvironmentSchema.shape[key])
	);

export type EnvironmentSchemaValidatorFactoryType = typeof EnvironmentSchemaValidatorFactory;
