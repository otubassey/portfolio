import { HttpOperationBuilder, HttpOperationBuilderFactory } from "../operations";
import { KnownHttpHeaders } from "../utils";

/**
 * Abstract foundation managing framework-agnostic frontend HTTP client configurations.
 *
 * Centralizes universal transaction metadata decorations, such as injecting unique transaction
 * tracking identifiers into outgoing header dictionaries, ensuring unified request logging
 * and traceability across all downstream resource endpoints.
 */
abstract class HttpClient {
    public open<ResponseDataType>(): HttpOperationBuilder<ResponseDataType> {
        return this.applyGlobalDecorations(HttpOperationBuilderFactory.createForFetch<ResponseDataType>());
    }

	private applyGlobalDecorations<ResponseDataType>(
		builder: HttpOperationBuilder<ResponseDataType>
	): HttpOperationBuilder<ResponseDataType> {
        return builder.header(KnownHttpHeaders.X_TRANSACTION_ID, crypto.randomUUID());
    }
}

export default HttpClient;
