import Zod from "zod";

import Validator from "./validator";

/**
 * Zod-specific implementation of the IValidator interface.
 * Renamed to be explicit about the underlying technology.
 */
class ZodSchemaValidator<SchemaType> implements Validator<SchemaType, Zod.ZodSafeParseResult<SchemaType>> {
	constructor(private readonly schema: Zod.ZodType<SchemaType>) {}

	/**
	 * Validates the payload against the Zod schema.
	 */
	apply(payload: unknown): Zod.ZodSafeParseResult<SchemaType> {
		return this.schema.safeParse(payload);
	}
}

export default ZodSchemaValidator;
