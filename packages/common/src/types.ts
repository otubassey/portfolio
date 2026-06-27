import { BaseError } from "./errors";
import { LoggerFactoryEnvironmentKeys } from "./logger";

export type CommonModuleEnvironmentKeys = LoggerFactoryEnvironmentKeys;

export interface OperationResult<DataType> {
	data: DataType | null;
	error: BaseError | null;
	success: boolean;
}
