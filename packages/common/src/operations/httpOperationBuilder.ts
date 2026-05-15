import { ConfigurationError, FalloutError } from "../errors";
import { ExecutionResult, OperationPipeline } from "../pipelines";

class HttpContext {
    public url: string = "";
    public method: "GET" | "POST" | "PUT" | "DELETE" = "GET";
    public headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    public body: any = null;
}

/**
 * Fluent request builder managing cross-platform fetch streams and transport transactions.
 *
 * Provides a chainable, type-safe API to configure paths, methods, payloads, and custom headers,
 * automatically parsing downstream protocol failure payloads into structured exceptions.
 */
class HttpOperationBuilder {
    private readonly context = new HttpContext();

    public get(url: string): this {
        this.context.method = "GET";
        this.context.url = url;
        return this;
    }

    public post(url: string): this {
        this.context.method = "POST";
        this.context.url = url;
        return this;
    }

    public header(key: string, value: string): this {
        this.context.headers[key] = value;
        return this;
    }

    public body(data: any): this {
        this.context.body = data;
        return this;
    }

    public async invoke(): Promise<ExecutionResult<Response>> {
        if(!this.context.url) {
            throw new ConfigurationError(
                "HTTP Execution Failed",
                "Cannot invoke an HTTP transaction without a target URL path."
            );
        }

        const config: RequestInit = {
            method: this.context.method,
            headers: this.context.headers,
        };

        if(this.context.method !== "GET" && this.context.body) {
            config.body = JSON.stringify(this.context.body);
        }

		try {
			const response = await fetch(this.context.url, config);

			if(!response.ok) {
                const errorBody = await response.json().catch(() => ({}));

                return {
                    success: false,
                    data: null,
                    error: new FalloutError(
                        errorBody?.message || `Transport failure: ${response.statusText}`,
                        errorBody?.detail || "The downstream server rejected the request parameters.",
                        response.status
                    )
                };
            }

			return {
                success: true,
                data: response,
                error: null
            };
		} catch(error) {
            return {
                success: false,
                data: null,
                error: new FalloutError(
                    "Network communication transport failure.",
                    (error as any)?.message || "The platform fetch stream encountered an uncaught hardware socket exception."
                )
            };
		}
    }

	public pipe(): OperationPipeline<any, Response, Response> {
        return new OperationPipeline<any, Response, Response>(async (): Promise<ExecutionResult<Response>> => {
            return await this.invoke();
        });
    }
}

export default HttpOperationBuilder;
