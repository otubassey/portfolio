export interface DetailedError {
	name: string;
	message: string;
	detail: string;
}

export abstract class BaseError extends Error implements DetailedError {
	public readonly transactionId: string;

	constructor(
		public readonly message: string,
		public readonly detail: string = "",
		transactionId?: string
	) {
		super(message);
		this.name = this.constructor.name;
		this.transactionId = transactionId || crypto.randomUUID();

		// Ensure the prototype is correct for custom Error classes
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

/**
 * An abstract fluent builder providing shared configuration properties for HttpErrors.
 * Uses a polymorphic 'this' type return constraint to preserve downstream child method chains.
 */
abstract class BaseBuilder<TargetError, This> {
	protected message: string = "";
	protected detail: string = "";
	protected transactionId?: string;

	public withMessage(this: This, message: string): This {
		(this as any).message = message;
		return this;
	}

	public withDetail(this: This, detail: string): This {
		(this as any).detail = detail;
		return this;
	}

	public withTransactionId(this: This, id: string): This {
		(this as any).transactionId = id;
		return this;
	}

	/**
	 * Every concrete builder must implement its own final construction logic.
	 */
	public abstract build(): TargetError;
}

/**
 * A Domain-level error for missing or invalid environment/museum settings.
 * This is a BaseError, because it represents a structural failure in the vault's setup.
 */
export class ConfigurationError extends BaseError {
    constructor(message: string, detail: string = "") {
        super(message, detail);
    }
}

/**
 * System error thrown when an invalid, unrecognized, or unmapped action
 * configuration token breaches the pipeline runtime lifecycle.
 *
 * @class UnsupportedError
 * @extends {BaseError}
 */
export class UnsupportedError extends BaseError {
    constructor(message: string, detail: string = "") {
        super(message, detail);
    }
}

export abstract class HttpError extends BaseError {
    constructor(
        public readonly statusCode: number = 500,
        readonly message: string,
        readonly detail: string = "",
		transactionId?: string
    ) {
        super(message, detail, transactionId);
    }
}

/**
 * 400 Bad Request
 * Used when required parameters are missing.
 */
export class BadRequestError extends HttpError {
	constructor(
		message?: string,
		detail: string = "",
		transactionId?: string
	) {
		super(
			400,
			message || "Required request parameter is missing",
			detail,
			transactionId
		);
	}
}

/**
 * 500 Unexpected System Failure / Unknown State
 * Used as a fallback when an error is caught that isn't a specific
 * Client or Server error (e.g., a vanilla JS crash or unhandled exception).
 */
export class FalloutError extends HttpError {
	constructor(
		message?: string,
		detail: string = "",
		statusCode?: number,
		transactionId?: string
	) {
		super(
			statusCode || 500,
			message || "An unexpected system error occurred",
			detail,
			transactionId
		);
	}
}

/**
 * 500 Internal Server Error
 * Used for unexpected "Fallout" or infrastructure failures (Resend, etc.).
 */
export class InternalServerError extends HttpError {
	constructor(
		message?: string,
		detail: string = "",
		transactionId?: string
	) {
		super(
			500,
			message || "An unexpected error occurred on the server.",
			detail,
			transactionId
		);
	}
}

/**
 * 500 Service Unavailable Error
 * Used for Maintenance mode or heavy load.
 */
export class ServiceUnavailableError extends HttpError {
	constructor(
		message?: string,
		detail: string = "",
		transactionId?: string
	) {
		super(
			503,
			message || "Under Maintaince. Please try again later.",
			detail,
			transactionId
		);
	}
}

/**
 * 429 Too Many Requests
 * Used when the rate limiter (Upstash/Redis) triggers.
 */
export class TooManyRequestsError extends HttpError {
	public readonly headers: Record<string, string>;

	constructor(
		message: string = "",
		detail: string = "",
		limit: number = 0,
		remaining: number = 0,
		reset: number = Date.now() + 60000, // Default to 60 seconds from now
		transactionId?: string
	) {
		super(
			429,
			message || "Rate limit exceeded. Please try again later.",
			detail,
			transactionId
		);

		const retryAfter = Math.max(0, Math.ceil((reset - Date.now()) / 1000));
		this.headers = {
			"X-RateLimit-Limit": limit.toString(),
			"X-RateLimit-Remaining": remaining.toString(),
			"X-RateLimit-Reset": reset.toString(),
			"Retry-After": retryAfter.toString()
		};
	}

	public static Builder() {
		return new TooManyRequestsErrorBuilder();
	}
}

class TooManyRequestsErrorBuilder extends BaseBuilder<TooManyRequestsError, TooManyRequestsErrorBuilder> {
	private limit: number = 0;
	private remaining: number = 0;
	private reset: number = Date.now() + 60000;

	public withLimit(limit: number): this {
		this.limit = limit;
		return this;
	}

	public withRemaining(remaining: number): this {
		this.remaining = remaining;
		return this;
	}

	public withReset(reset: number): this {
		this.reset = reset;
		return this;
	}

	public build(): TooManyRequestsError {
		return new TooManyRequestsError(
			this.message,
			this.detail,
			this.limit,
			this.remaining,
			this.reset,
			this.transactionId || crypto.randomUUID()
		);
	}
}

export interface ErrorAttribute {
	attribute: string;
	errors: ReadonlyArray<string>;
}

/**
 * 422 Unprocessable Content
 * Used when the request is syntactically correct (valid JSON)
 * but the content fails validation or business rules.
 */
export class ValidationError extends HttpError {
	public readonly errors: ReadonlyArray<ErrorAttribute>;

    constructor(
		message: string = "",
        detail: string = "",
		errors: ReadonlyArray<ErrorAttribute>,
        transactionId?: string
    ) {
        super(
			422,
			message || "The submission contains validation errors. Please review and address the errors.",
			detail || ValidationError.createDetail(errors),
			transactionId
		);
		this.errors = errors;
    }

	private static createDetail(errors: ReadonlyArray<ErrorAttribute>): string {
		if(errors.length === 0) {
			return "";
		}
		const fields = errors.map((error) => `'${error.attribute}'`);
		if(fields.length === 1) {
			return `Validation failed for the field: ${fields[0]}.`;
		}
		const formattedFields = `${fields.slice(0, -1).join(", ")} and ${fields.slice(-1)}`;
		return `Validation failed for the following fields: ${formattedFields}.`;
	}

	public static Builder() {
        return new ValidationErrorBuilder();
    }

}

class ValidationErrorBuilder extends BaseBuilder<ValidationError, ValidationErrorBuilder> {
	private errors: ReadonlyArray<ErrorAttribute> = [];

	public withErrors(errors: ReadonlyArray<ErrorAttribute>): this {
		this.errors = errors;
		return this;
	}

	public build(): ValidationError {
		return new ValidationError(
			this.message,
			this.detail,
			this.errors,
			this.transactionId || crypto.randomUUID()
		);
	}
}
