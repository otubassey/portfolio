import Zod from "zod";

import { ConfigurationError, ValidationError } from "../errors";

import Validator, { ValidationResult } from "./validator";

/**
 * Zod-specific implementation of the Validator interface.
 */
class ZodSchemaValidator<SchemaType> implements Validator<SchemaType> {
	constructor(private readonly schema: Zod.ZodType<SchemaType>) {
		if(!schema) {
			throw new ConfigurationError(
				"ZodSchemaValidator creation Failed",
				"A schema is required to create a ZodSchemaValidator instamce."
			);
		}
	}

	/**
	 * Validates the payload against the Zod schema.
	 */
	validate(payload: unknown): ValidationResult<SchemaType> {
		const result = this.schema.safeParse(payload);

		if(result.success) {
			return {
				isValid: true,
				data: result.data as SchemaType,
				error: null
			};
		}

		// Map Zod-specific issues into a flat, framework-agnostic error array
		const formattedErrors = result.error.issues.map(issue => ({
			// Flat dot-notation paths (e.g., "redis.port" or "root" if primitive string validation)
			attribute: issue.path.map(String).join(".") || "root",
			errors: [issue.message],
		}));

		const error = ValidationError.Builder()
			.withMessage("Inbound data schema assertion constraints violated.")
			.withDetail("The payload contains malformed attributes or missing required fields.")
			.withErrors(formattedErrors)
			.build();

		return {
			isValid: false,
			data: null,
			error
		};
	}
}

export default ZodSchemaValidator;
