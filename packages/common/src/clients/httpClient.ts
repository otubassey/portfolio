import { HttpOperationBuilder } from "../operations";

/**
 * Abstract foundation managing framework-agnostic frontend HTTP client configurations.
 *
 * Centralizes universal transaction metadata decorations, such as injecting unique transaction
 * tracking identifiers into outgoing header dictionaries, ensuring unified request logging
 * and traceability across all downstream resource endpoints.
 */
abstract class HttpClient {
    protected applyGlobalDecorations(builder: HttpOperationBuilder): HttpOperationBuilder {
        return builder.header("X-Transaction-Id", crypto.randomUUID());
    }

    public open(): HttpOperationBuilder {
        return this.applyGlobalDecorations(new HttpOperationBuilder());
    }
}

export default HttpClient;
