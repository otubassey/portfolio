import { EnvironmentRegistry, LoggerProvider } from "@otuekong-portfolio/common";

import ResendClient from "./resendClient";
import { ResendEnvironmentKeys } from "./types";

interface ResendClientModuleParameters {
	environmentRegistry: EnvironmentRegistry<ResendEnvironmentKeys>;
	loggerProvider: LoggerProvider;
}

class ResendClientModule {
	private resendClient: ResendClient | null = null;

	constructor(private readonly parameters: ResendClientModuleParameters) {}

	public getResendClient(): ResendClient {
		if(!this.resendClient) {
			this.resendClient = new ResendClient(
				this.parameters.environmentRegistry,
				this.parameters.loggerProvider
			);
		}
		return this.resendClient;
	}
}

export default ResendClientModule;
