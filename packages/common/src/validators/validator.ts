export interface ValidationError {
	path: string;
	message: string;
}

export type ValidationResult<T> =
	| {
		isValid: true;
		data: T
		errors: Array<never>
	}
	| {
		isValid: false;
		data: null,
		errors: Array<ValidationError>
	};

/**
 * Generic validator interface for any validation strategy.
 */
interface Validator<T> {
	validate(payload: unknown): ValidationResult<T>;
}

export default Validator;
