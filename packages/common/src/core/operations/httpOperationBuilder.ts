import { ConfigurationError } from "../errors";
import { OperationPipeline } from "../pipelines";

import HttpOperation from "./httpOperation";
import { HttpOperationOptions, OperationResult } from "./types";

class HttpContext {
    public url: string = "";
    public method: "GET" | "POST" | "PUT" | "DELETE" = "GET";
    public headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    public body: any = null;
}

/**
 * Fluent request builder managing cross-platform engine operations and transport transactions.
 * Decoupled from native platforms by using an injected HttpOperation abstraction strategy.
 *
 * Provides a chainable, type-safe API to configure paths, methods, payloads, and custom headers,
 * automatically parsing downstream protocol failure payloads into structured exceptions.
 */
class HttpOperationBuilder<ResponseDataType = unknown> {
    private readonly context = new HttpContext();

	constructor(private readonly httpOperation: HttpOperation) {
		if(!httpOperation) {
			throw new ConfigurationError(
				"HttpOperationBuilder creation Failed",
				"An httpOperation is required to create a HttpOperationBuilder instamce."
			);
		}
	}

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

    public async invoke(): Promise<OperationResult<ResponseDataType>> {
        if(!this.context.url) {
            throw new ConfigurationError(
                "HTTP Execution Failed",
                "Cannot invoke an HTTP transaction without a target URL path."
            );
        }

        const options: HttpOperationOptions = {
            method: this.context.method,
            headers: this.context.headers,
			body: this.context.method !== "GET" ? this.context.body : undefined
        };

        return await this.httpOperation.request<ResponseDataType>(this.context.url, options);
    }

	public pipe(): OperationPipeline<any, ResponseDataType, ResponseDataType> {
        return new OperationPipeline<any, ResponseDataType, ResponseDataType>(async (): Promise<OperationResult<ResponseDataType>> => (
			await this.invoke()
		));
    }
}

export default HttpOperationBuilder;
