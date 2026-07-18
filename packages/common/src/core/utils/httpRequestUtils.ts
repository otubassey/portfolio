import { MissingHeaderError } from "../errors";

import MapUtils from "./mapUtils";


export const KnownHttpHeaders = Object.freeze({
	CONTENT_TYPE: "content-type",
	X_CLIENT_ID: "x-client-id",
	X_CORRELATION_ID: "x-correlation-id",
	X_FORWARDED_FOR: "x-forwarded-for",
	X_REQUEST_ID: "x-request-id",
	X_TARGET_APP_ID: "x-target-app-id",
	X_TRANSACTION_ID: "x-transaction-id"
} as const);

export type KnownHeaderKeys = typeof KnownHttpHeaders[keyof typeof KnownHttpHeaders];

export const RESPONSE_HEADER_WHITELIST = Object.freeze(new Set([
	KnownHttpHeaders.CONTENT_TYPE,
	KnownHttpHeaders.X_CLIENT_ID,
	KnownHttpHeaders.X_TARGET_APP_ID,
	KnownHttpHeaders.X_TRANSACTION_ID
]));

/**
 * Utility class for safely extracting headers from HTTP requests.
 */
class HttpRequestUtils {
	/**
	 * Converts an iterable list of string key-value pairs into a clean TypeScript Map.
	 * This method remains purely platform-agnostic by avoiding runtime-specific classes.
	 *
	 * @param entries - An iterable sequence of [key, value] pairs (e.g., from request.headers.entries())
	 * @returns A Map containing the header keys and their corresponding values.
	 */
	public entriesToMap(entries: Iterable<[string, string]>): Map<string, string> {
		const headerMap = new Map<string, string>();

		for(const [key, value] of entries) {
			headerMap.set(key, value);
		}

		if(!headerMap.has(KnownHttpHeaders.X_TRANSACTION_ID)) {
			headerMap.set(KnownHttpHeaders.X_TRANSACTION_ID, crypto.randomUUID());
		}

		return Object.freeze(headerMap);
	}

	/**
	 * Filter request entries and construct a safe header map for responses.
	 */
	public extractResponseHeaders(requestEntries: Iterable<[string, string]>): Map<string, string> {
		const responseHeaders = new Map<string, string>();

		for (const [key, value] of requestEntries) {
			const normalizedKey = key.toLowerCase();

			if(RESPONSE_HEADER_WHITELIST.has(normalizedKey as any)) {
				responseHeaders.set(normalizedKey, value);
			}
		}

		return responseHeaders;
	}

	/**
	 * Retrieves the value of a header, ignoring case sensitivity.
	 * Returns undefined if the header does not exist.
	 */
	public getHeader(
		headers: Record<string, string | Array<string> | undefined>
			| Map<string, string | Array<string> | undefined>,
		headerName: KnownHeaderKeys | string = ""
	): string | undefined {
		if(!headers) return undefined;

		let headersMap: Map<string, string | Array<string> | undefined>;

		if(headers instanceof Map) {
			headersMap = headers;
		} else {
			headersMap = MapUtils.fromRecord<string, string | Array<string>>(headers, {
				lowercaseKeys: true
			});
		}

		const value = headersMap.get(headerName.toLowerCase());

		if(Array.isArray(value)) {
			return value.join(", ");
		}

		return value;
	}

	/**
	 * Retrieves a header value or throws a MissingHeaderError if it is absent.
	 */
	public getRequiredHeader(
		headers: Map<string, string | Array<string> | undefined>,
		headerName: KnownHeaderKeys | string
	): string {
		const value = this.getHeader(headers, headerName);

		if(!value || value.trim() === "") {
			throw new MissingHeaderError(headerName);
		}

		return value;
	}

	public getTransactionId(headers: Map<string, string | Array<string> | undefined>) {
		return this.getHeader(headers, KnownHttpHeaders.X_TRANSACTION_ID);
	}

	public getTransactionIdOrDefault(headers: Map<string, string | Array<string> | undefined>) {
		return this.getTransactionId(headers) || crypto.randomUUID();
	}
}

export default new HttpRequestUtils();
