import { EnvironmentRegistry } from "./config";
import { LoggerFactory } from "./logger";
import { CommonModuleEnvironmentKeys } from "./types";

interface CommonModuleParameters {
	environmentRegistry: EnvironmentRegistry<CommonModuleEnvironmentKeys>;
}

class CommonModule {
	private loggerFactory: LoggerFactory | null = null;

  	constructor(private readonly parameters: CommonModuleParameters) {}

	public getLoggerFactory(): LoggerFactory {
		if(!this.loggerFactory) {
			this.loggerFactory = new LoggerFactory(
				this.parameters.environmentRegistry
			);
		}
		return this.loggerFactory;
	}
}

export default CommonModule;
