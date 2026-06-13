import { NodeEnvironment } from "../constants";
import { ConfigurationError } from "../errors";

import {
	EnvironmentSchemaValidatorFactory,
	EnvironmentSchemaValidatorFactoryType,
	EnvironmentVariable
} from "./environmentSchema";

class EnvironmentRegistryInternal {
	private static instance: EnvironmentRegistryInternal;
    private cache: Map<EnvironmentVariable, string> = new Map();

    private constructor(
		private readonly environmentSchemaValidatorFactory: EnvironmentSchemaValidatorFactoryType
	) {}

	public static getInstance(
		environmentSchemaValidatorFactory: EnvironmentSchemaValidatorFactoryType
	): EnvironmentRegistryInternal {
		if(!EnvironmentRegistryInternal.instance) {
			EnvironmentRegistryInternal.instance = new EnvironmentRegistryInternal(environmentSchemaValidatorFactory);
		}
		return EnvironmentRegistryInternal.instance;
    }

    public get CLIENT_LOG_LEVEL(): string {
		return this.get("CLIENT_LOG_LEVEL");
	}

    public get CONTACT_FORM_RECIPIENT_EMAIL(): string {
		return this.get("CONTACT_FORM_RECIPIENT_EMAIL");
	}

    public get LOG_LEVEL(): string {
		return this.get("LOG_LEVEL");
	}

    public get NODE_ENV(): string {
		return this.get("NODE_ENV") || NodeEnvironment.PROD;
	}

    public get RESEND_API_KEY(): string {
		return this.get("RESEND_API_KEY");
	}

    public get SERVER_LOG_LEVEL(): string {
		return this.get("SERVER_LOG_LEVEL");
	}

    public get SYSTEM_SENDER_EMAIL(): string {
		return this.get("SYSTEM_SENDER_EMAIL");
	}

    public get UPSTASH_REDIS_REST_TOKEN(): string {
		return this.get("UPSTASH_REDIS_REST_TOKEN");
	}

    public get UPSTASH_REDIS_REST_URL(): string {
		return this.get("UPSTASH_REDIS_REST_URL");
	}

	private get(key: EnvironmentVariable): string {
        if(this.cache.has(key)) {
            return this.cache.get(key)!;
        }

        const value = process.env[key];

		const validationResult = this.environmentSchemaValidatorFactory(key)
			.validate(value);

        if(!validationResult.isValid) {
            const errorMessage = validationResult.errors
                .map(validationError => validationError.message)
                .join(", ");

            throw new ConfigurationError(
                "Environment Configuration Hydration Failure",
                `Environment variable '${key}' is invalid: ${errorMessage}`
            );
        }

        this.cache.set(key, validationResult.data ?? "");

        return validationResult.data ?? "";
    }
}

/**
 * Global immutable container managing runtime environment validation and access.
 *
 * Accepts an injected Zod schema validator to parse process.env parameters eagerly at startup,
 * catching malformed platform states instantly and exposing verified, fully typed string
 * configurations via safe property getters.
 */
const EnvironmentRegistry = EnvironmentRegistryInternal.getInstance(EnvironmentSchemaValidatorFactory);

export default EnvironmentRegistry;
