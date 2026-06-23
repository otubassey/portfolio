import { LogLevel } from "@otuekong-portfolio/common";

export const EMAIL_JSON_SCHEMA_PROPERTY = {
	type: "string",
	format: "email"
} as const;

export const LOG_LEVEL_JSON_SCHEMA_PROPERTY = {
	type: "string",
	enum: Object.values(LogLevel),
	default: LogLevel.INFO
} as const;

export const NODE_ENV_SCHEMA_PROPERTY = {
	type: "string",
	enum: ["development", "production", "test"],
	default: "development"
} as const;

export const RESEND_API_KEY = {
	type: "string",
	minLength: 1
} as const;

export const UPSTASH_REDIS_REST_URL = {
	type: "string",
	format: "uri"
} as const;

export const UPSTASH_REDIS_REST_TOKEN = {
	type: "string"
} as const;
