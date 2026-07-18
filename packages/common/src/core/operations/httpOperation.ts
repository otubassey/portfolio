import { HttpOperationOptions, OperationResult } from "./types";

interface HttpOperation {
	request<DataType>(
		url: string,
		config?: HttpOperationOptions
	): Promise<OperationResult<DataType>>;
}

export type { HttpOperation as default };
