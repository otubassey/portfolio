import { LogLevel } from "@otuekong-portfolio/common";

const LOG_LEVEL_JSON_SCHEMA_PROPERTY = {
	type: "string",
	enum: Object.values(LogLevel),
	default: LogLevel.INFO
} as const;

const GalleryEnvironmentJsonSchema = {
	$id: "gallery-env-schema",
	type: "object",
	required: [
		"LOG_LEVEL",
		"NODE_ENV",
		"PORTFOLIO_EMAIL_SENDER",
		"PORTFOLIO_EMAIL_TARGET",
		"RESEND_API_KEY",
		"UPSTASH_REDIS_REST_URL",
		"UPSTASH_REDIS_REST_TOKEN"
	],
	properties: {
		LOG_LEVEL: LOG_LEVEL_JSON_SCHEMA_PROPERTY,
		LOG_CLIENT_LEVEL: LOG_LEVEL_JSON_SCHEMA_PROPERTY,
		LOG_SERVER_LEVEL: LOG_LEVEL_JSON_SCHEMA_PROPERTY,
		NODE_ENV: {
			type: "string",
			enum: ["development", "production", "test"],
			default: "development"
		},
		PORTFOLIO_EMAIL_SENDER: { type: "string" },
		PORTFOLIO_EMAIL_TARGET: { type: "string" },
		RESEND_API_KEY: {
			type: "string",
			minLength: 1
		},
		UPSTASH_REDIS_REST_URL: {
			type: "string",
			format: "uri"
		},
    	UPSTASH_REDIS_REST_TOKEN: { type: "string" }
	}
} as const;

export default GalleryEnvironmentJsonSchema;
