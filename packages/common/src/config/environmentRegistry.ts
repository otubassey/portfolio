import Zod from "zod";

import { ConfigurationError } from "../errors";

import ZodSchemaTransformer from "./zodSchemaTransformer";
import { SchemaValidatorFactory } from "./types";

export interface EnvironmentRegistryOptions {
	/**
	 * "eager" will validate the entire schema immediately on instantiation.
	 * "lazy" will only validate individual fields on-demand when requested.
	 */
	validationStrategy: "eager" | "lazy";
}

interface JsonSchema<Keys extends string> {
	readonly properties: Record<Keys, any>;
	readonly required?: readonly string[] | readonly any[]
}

class EnvironmentRegistry<EnvironmentKeys extends string> {
	private readonly cache: Map<string, string> = new Map();

	private readonly allowedKeys: Set<EnvironmentKeys>;
	private readonly zodSchema: Zod.ZodObject<any>;

    constructor(
		jsonSchema: JsonSchema<EnvironmentKeys>,
		zodSchemaTransformer: ZodSchemaTransformer,
		private readonly schemaValidatorFactory: SchemaValidatorFactory<EnvironmentKeys>,
		private readonly options: EnvironmentRegistryOptions = { validationStrategy: "eager" }
	) {
		if(!jsonSchema) {
            throw new ConfigurationError(
                "Environment Registry Initialization Failed",
                "A valid jsonSchema must be supplied to construct the EnvironmentRegistry."
            );
        }

		if(!zodSchemaTransformer) {
            throw new ConfigurationError(
                "Environment Registry Initialization Failed",
                "A valid ZodSchemaTransformer must be supplied to construct the EnvironmentRegistry."
            );
        }

		this.allowedKeys = new Set(Object.keys(jsonSchema.properties) as Array<EnvironmentKeys>);
		this.zodSchema = zodSchemaTransformer.transform(jsonSchema);

		if(this.options.validationStrategy === "eager") {
			this.validateAll(jsonSchema);
		}
	}

	public get(key: EnvironmentKeys): string {
		if(!this.allowedKeys.has(key)) {
			throw new ConfigurationError(
				"Unknown environment variable",
				`Access Denied: Variable '${key}' is not defined in the JSON Schema configurations.`
			);
		}

        if(this.cache.has(key)) {
            return this.cache.get(key)!;
        }

        const value = process.env[key];

		const validationResult = this.schemaValidatorFactory(this.zodSchema, key)
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

	private validateAll(jsonSchema: JsonSchema<EnvironmentKeys>): void {
		const processEnvKeys = Object.keys(jsonSchema.properties) as Array<EnvironmentKeys>;
		for(const key of processEnvKeys) {
			this.get(key);
		}
	}
}

export default EnvironmentRegistry;
