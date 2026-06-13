import Zod from "zod";

import Validator, { ValidationError, ValidationResult } from "./validator";

/**
 * Zod-specific implementation of the Validator interface.
 */
class ZodSchemaValidator<SchemaType> implements Validator<SchemaType> {
	constructor(private readonly schema: Zod.ZodType<SchemaType>) {}

	/**
	 * Validates the payload against the Zod schema.
	 */
	validate(payload: unknown): ValidationResult<SchemaType> {
		const result = this.schema.safeParse(payload);

		if(result.success) {
			return {
				isValid: true,
				data: result.data as SchemaType,
				errors: []
			};
		}

		// Map Zod-specific issues into a flat, framework-agnostic error array
		const formattedErrors: Array<ValidationError> = result.error.issues.map(issue => ({
			// Flat dot-notation paths (e.g., "redis.port" or "root" if primitive string validation)
			path: issue.path.map(String).join(".") || "root",
			message: issue.message,
		}));

		return {
			isValid: false,
			data: null,
			errors: formattedErrors
		};
	}
}

export default ZodSchemaValidator;
