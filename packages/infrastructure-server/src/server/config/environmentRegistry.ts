import { ConfigurationError } from "@otuekong-portfolio/common";

import { EnvironmentSchema, EnvironmentVariable } from "./environmentSchema";

class EnvironmentRegistryInternal {
	private static instance: EnvironmentRegistryInternal;
    private cache: Map<EnvironmentVariable, string> = new Map();

    private constructor() {}

	public static getInstance(): EnvironmentRegistryInternal {
		if(!EnvironmentRegistryInternal.instance) {
			EnvironmentRegistryInternal.instance = new EnvironmentRegistryInternal();
		}
		return EnvironmentRegistryInternal.instance;
    }

    public get CONTACT_FORM_RECIPIENT_EMAIL(): string {
		return this.get("CONTACT_FORM_RECIPIENT_EMAIL");
	}

    public get RESEND_API_KEY(): string {
		return this.get("RESEND_API_KEY");
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

		// TODO: enhance ZodSchemaValidator to handle this
        const schema = EnvironmentSchema.shape[key];
        const result = schema.safeParse(value);

        if(!result.success) {
            const errorMessage = result.error.issues
                .map(error => error.message)
                .join(', ');

            throw new ConfigurationError(
                "Environment Configuration Hydration Failure",
                `Environment variable '${key}' is invalid: ${errorMessage}`
            );
        }

        this.cache.set(key, result.data);

        return result.data;
    }
}

/**
 * Global immutable container managing runtime environment validation and access.
 *
 * Accepts an injected Zod schema validator to parse process.env parameters eagerly at startup,
 * catching malformed platform states instantly and exposing verified, fully typed string
 * configurations via safe property getters.
 */
const EnvironmentRegistry = EnvironmentRegistryInternal.getInstance();

export default EnvironmentRegistry;
