import { FalloutError } from "../errors";

import HttpOperation from "./httpOperation";
import { HttpOperationOptions, OperationResult } from "./types";

class FetchHttpOperation implements HttpOperation {
    async request<DataType>(
		url: string,
		options?: HttpOperationOptions
	): Promise<OperationResult<DataType>> {
        try {
            const fetchOptions: RequestInit = this.createOptions(options);

            const response = await fetch(url, fetchOptions);

            return this.mapResponse(response);
        } catch (error: unknown) {
            return {
                success: false,
                data: null,
				error: new FalloutError(
                    "Unknown network or system failure.",
                    (error as any)?.message,
					(error as any)?.status || 500
                )
            };
        }
    }

	private createOptions(options?: HttpOperationOptions): RequestInit {
		const fetchOptions: RequestInit = {
			method: options?.method ?? "GET",
			headers: {
				"Content-Type": "application/json",
				...options?.headers
			}
		};

		if(options?.body) {
			fetchOptions.body = typeof options.body === "string"
				? options.body
				: JSON.stringify(options.body);
		}

		if(options?.timeout) {
			fetchOptions.signal = AbortSignal.timeout(options.timeout);
		}

		return fetchOptions;
	}

	private async mapResponse<DataType>(response: Response): Promise<OperationResult<DataType>> {
		if(!response.ok) {
			const error = await this.mapNotOkResponseError(response);
			return {
				success: false,
				data: null,
				error
			};
		}

		if(response.status === 204) {
			return {
				success: true,
				data: null,
				error: null
			};
		}

		const data = await response.json() as DataType;
		return {
			success: true,
			data,
			error: null
		};
	}

	private async mapNotOkResponseError(response: Response): Promise<FalloutError> {
		const detailedMessage = await this.mapDetailedErrorMessage(response);
		return new FalloutError(
			this.mapUserErrorMessage(response),
			detailedMessage,
			response.status
		);
	}

	private async mapDetailedErrorMessage(response: Response, url: string = ""): Promise<string> {
		try {
			const contentType = this.extractContentType(response);

			if(contentType.includes("text/html")) {
				// For static hosting router fallback
				// (like an SPA router landing page on Nginx, Cloudflare, or Vercel) scenarios
				return `A 404 Not Found error occurred, targeting URL: "${url}".`;
			}

			if(contentType.includes("application/json")) {
				const jsonError = await response.json();

				const serverMessage = jsonError.message || jsonError.error || jsonError.detail;

				return typeof serverMessage === "string"
					? serverMessage
					: JSON.stringify(jsonError);
			}

			const textError = (await response.text()).trim();

			if(textError) {
				return textError;
			}
		} catch {
			// TODO: log the below
			// Stream read failed: troubleshooting details remain the default status string
		}

		return `The remote server rejected the request with HTTP error status: ${response.status}`;
	}

	private mapUserErrorMessage(response: Response): string {
		if(response.status >= 500) {
			return "Our servers are experiencing technical difficulties. Please try again momentarily.";
		}

		if(response.status === 401 || response.status === 403) {
			return "You do not have permission to perform this action.";
		}

		if(response.status === 404) {
			const contentType = this.extractContentType(response);
			if(contentType.includes("text/html")) {
				// For static hosting router fallback
				// (like an SPA router landing page on Nginx, Cloudflare, or Vercel) scenarios
				return "The application service is temporarily unavailable.";
			}
			return "The requested resource could not be found.";
		}

		return "An unexpected error occurred. Please try again later.";
	}

	private extractContentType(response: Response): string {
		return response.headers.get("content-type") || "";
	}
}

export default FetchHttpOperation;
