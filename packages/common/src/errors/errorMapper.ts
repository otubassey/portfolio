import {
	BaseError,
	BadRequestError,
	FalloutError,
	InternalServerError,
	ServiceUnavailableError,
	TooManyRequestsError,
	HttpError,
	ValidationError
} from "./errors";

/**
 * Pure transformation utility mapping raw infrastructure failures into domain exceptions.
 *
 * Inspects uncaught network exceptions, database driver crashes, or protocol errors to construct
 * uniform application exceptions, safeguarding upstream UI views from platform leakages.
 */
class ErrorMapper {
	/**
	 * Converts a raw fetch response/JSON into a specific Error Class
	 */
	fromResponse(status: number, data: any): BaseError {
		const message = data?.message || "";
		const detail = data?.detail || "";

		switch (status) {
		case 400:
			return new BadRequestError(message, detail);
		case 422:
    		return new ValidationError(
				message,
				detail,
				data?.errors || []
			);
		case 429:
			return new TooManyRequestsError(
				message,
				detail,
				data?.limit,
				data?.remaining,
				data?.reset
			);
		case 500:
			return new InternalServerError(message, detail);
		case 503:
			return new ServiceUnavailableError(message, detail);
		default:
			return new FalloutError(message, detail, status);
		}
	}

	/**
	 * Maps a caught error to the standard JSON structure and Status Code
	 */
	toResponse(error: unknown) {
		if(error instanceof ValidationError) {
			return {
				body: {
					message: error.message,
					detail: error.detail,
					errors: error.errors,
					transactionId: error.transactionId
				},
				status: error.statusCode
			};
		}

		if(error instanceof HttpError) {
			const headers: Record<string, string> = {};

			if(error instanceof TooManyRequestsError) {
				Object.assign(headers, error.headers);
			}

			return {
				body: {
					message: error.message,
					detail: error.detail,
					transactionId: error.transactionId
				},
				headers,
				status: error.statusCode
			};
		}

		// Fallback for native JS errors or unknown fallout
		return {
			body: {
				message: "An unhandled operational execution runtime anomaly was intercepted.",
				detail: (error as any).message || "No downstream error description was provided by the thread context.",
				transactionId: crypto.randomUUID()
			},
			status: 500
		};
	}
}

export default new ErrorMapper();
