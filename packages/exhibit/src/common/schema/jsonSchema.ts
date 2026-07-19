import { LogLevel } from "@otuekong-portfolio/common";

export const JSON_SCHEMA_PROPERTY_APP_NAME = Object.freeze({
	type: "string",
	minLength: 1
} as const);

export const JSON_SCHEMA_PROPERTY_CRON_SECRET = Object.freeze({
	type: "string",
	minLength: 1
} as const);

export const JSON_SCHEMA_PROPERTY_EMAIL = Object.freeze({
	type: "string",
	format: "email"
} as const);

export const JSON_SCHEMA_PROPERTY_LOG_LEVEL = Object.freeze({
	type: "string",
	enum: Object.values(LogLevel),
	default: LogLevel.INFO
} as const);

export const JSON_SCHEMA_PROPERTY_NODE_ENV = Object.freeze({
	type: "string",
	enum: ["development", "production", "test"],
	default: "development"
} as const);

export const JSON_SCHEMA_PROPERTY_RESEND_API_KEY = Object.freeze({
	type: "string",
	minLength: 1
} as const);

export const JSON_SCHEMA_PROPERTY_UPSTASH_REDIS_REST_URL = Object.freeze({
	type: "string",
	format: "uri"
} as const);

export const JSON_SCHEMA_PROPERTY_UPSTASH_REDIS_REST_TOKEN = Object.freeze({
	type: "string",
	minLength: 1
} as const);
