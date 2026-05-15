/**
 * Generic validator interface for any validation strategy.
 */
interface Validator<SchemaType, ValidatorResult = any> {
	apply(payload: unknown): ValidatorResult;
}

export default Validator;
