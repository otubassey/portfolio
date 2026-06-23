import {
	EMAIL_JSON_SCHEMA_PROPERTY,
	LOG_LEVEL_JSON_SCHEMA_PROPERTY,
	NODE_ENV_SCHEMA_PROPERTY,
	RESEND_API_KEY,
	UPSTASH_REDIS_REST_URL,
	UPSTASH_REDIS_REST_TOKEN
} from "../../common";

const isBuildTime = process.env.NEXT_PHASE === "phase-production-build";

const RuntimeSchema = {
	$id: "pavilion-env-schema",
	type: "object",
	required: [
		"LOG_LEVEL",
		"NODE_ENV",
		"RESEND_API_KEY",
		"UPSTASH_REDIS_REST_URL",
		"UPSTASH_REDIS_REST_TOKEN"
	],
	properties: {
		LOG_LEVEL: LOG_LEVEL_JSON_SCHEMA_PROPERTY,
		LOG_CLIENT_LEVEL: LOG_LEVEL_JSON_SCHEMA_PROPERTY,
		LOG_SERVER_LEVEL: LOG_LEVEL_JSON_SCHEMA_PROPERTY,
		NODE_ENV: NODE_ENV_SCHEMA_PROPERTY,
		PORTFOLIO_EMAIL_SENDER: EMAIL_JSON_SCHEMA_PROPERTY,
		PORTFOLIO_EMAIL_TARGET: EMAIL_JSON_SCHEMA_PROPERTY,
		RESEND_API_KEY: RESEND_API_KEY,
		UPSTASH_REDIS_REST_URL: UPSTASH_REDIS_REST_URL,
		UPSTASH_REDIS_REST_TOKEN: UPSTASH_REDIS_REST_TOKEN
	}
} as const;

const BuildTimeSchema = {
	$id: "pavilion-env-schema",
	type: "object",
	required: ["NODE_ENV"],
	properties: {
		LOG_LEVEL: LOG_LEVEL_JSON_SCHEMA_PROPERTY,
		LOG_CLIENT_LEVEL: LOG_LEVEL_JSON_SCHEMA_PROPERTY,
		LOG_SERVER_LEVEL: LOG_LEVEL_JSON_SCHEMA_PROPERTY,
		NODE_ENV: NODE_ENV_SCHEMA_PROPERTY,
		PORTFOLIO_EMAIL_SENDER: { type: "string" },
		PORTFOLIO_EMAIL_TARGET: { type: "string" },
		RESEND_API_KEY: { type: "string" },
		UPSTASH_REDIS_REST_URL: { type: "string" },
		UPSTASH_REDIS_REST_TOKEN: { type: "string" }
	}
} as const;

const PavilionEnvironmentJsonSchema = isBuildTime ? BuildTimeSchema : RuntimeSchema;

export default PavilionEnvironmentJsonSchema;
