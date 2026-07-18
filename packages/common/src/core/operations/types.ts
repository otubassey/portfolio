import { BaseError } from "../errors";

export interface HttpOperationOptions {
	method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: unknown;
    timeout?: number;
}

export interface OperationResult<DataType> {
	data: DataType | null;
	error: BaseError | null;
	success: boolean;
}
