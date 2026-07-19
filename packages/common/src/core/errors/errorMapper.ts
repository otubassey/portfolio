import {
	BaseError,
	TooManyRequestsError,
	HttpError,
	ValidationError,
	BASE_ERROR_NAMES
} from "./errors";

/**
 * Pure transformation utility mapping raw infrastructure failures into domain exceptions.
 *
 * Inspects uncaught network exceptions, database driver crashes, or protocol errors to construct
 * uniform application exceptions, safeguarding upstream UI views from platform leakages.
 */
class ErrorMapper {
	/**
	 * Maps a caught error to the standard JSON structure and Status Code
	 */
	toResponse(error: unknown) {
		const errorName = (error as any).name;
		if(error instanceof ValidationError || errorName === ValidationError.name) {
			return {
				body: {
					message: (error as ValidationError).message,
					detail: (error as ValidationError).detail,
					errors: (error as ValidationError).errors,
					transactionId: (error as ValidationError).transactionId
				},
				status: (error as ValidationError).statusCode
			};
		}

		const isBaseError = BASE_ERROR_NAMES.includes(errorName);
		if(error instanceof BaseError || isBaseError) {
			const headers: Record<string, string> = {};

			if(error instanceof TooManyRequestsError || errorName === TooManyRequestsError.name) {
				Object.assign(headers, (error as TooManyRequestsError).headers);
			}

			return {
				body: {
					message: (error as BaseError).message,
					detail: (error as BaseError).detail,
					transactionId: (error as BaseError).transactionId
				},
				headers,
				status: (error as HttpError).statusCode ?? 500
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
