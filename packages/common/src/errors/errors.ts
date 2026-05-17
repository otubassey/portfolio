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
		return new class {
			private _message?: string;
			private _detail?: string;
			private _limit?: number;
			private _remaining?: number;
			private _reset?: number;
			private _transactionId?: string;

			withMessage(message: string) {
				this._message = message;
				return this;
			}

			withDetail(detail: string) {
				this._detail = detail;
				return this;
			}

			withLimit(limit: number) {
				this._limit = limit;
				return this;
			}

			withRemaining(remaining: number) {
				this._remaining = remaining;
				return this;
			}

			withReset(reset: number) {
				this._reset = reset;
				return this;
			}

			withTransactionId(id: string) {
				this._transactionId = id;
				return this;
			}

			build() {
				return new TooManyRequestsError(
					this._message,
					this._detail,
					this._limit,
					this._remaining,
					this._reset,
					this._transactionId || crypto.randomUUID()
				);
			}
		};
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
        return new class {
			private _message: string = "";
            private _detail: string = "";
            private _errors: ReadonlyArray<ErrorAttribute> = [];
            private _transactionId?: string;

            withMessage(message: string) {
                this._message = message;
                return this;
            }

            withDetail(detail: string) {
                this._detail = detail;
                return this;
            }

			withErrors(errors: ReadonlyArray<ErrorAttribute>) {
                this._errors = errors;
                return this;
            }

            withTransactionId(id: string) {
                this._transactionId = id;
                return this;
            }

            build() {
                return new ValidationError(
					this._message,
                    this._detail,
                    this._errors,
                    this._transactionId || crypto.randomUUID()
                );
            }
        };
    }
}
