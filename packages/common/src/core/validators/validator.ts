import { ValidationError } from "../errors";

export type ValidationResult<T> =
	| {
		isValid: true;
		data: T;
		error: null;
	}
	| {
		isValid: false;
		data: null;
		error: ValidationError;
	};

/**
 * Generic validator interface for any validation strategy.
 */
interface Validator<T> {
	validate(payload: unknown): ValidationResult<T>;
}

export default Validator;
