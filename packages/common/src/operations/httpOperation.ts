import { OperationResult } from "../types";

import { HttpOperationOptions } from "./types";

interface HttpOperation {
	request<DataType>(
		url: string,
		config?: HttpOperationOptions
	): Promise<OperationResult<DataType>>;
}

export default HttpOperation;
