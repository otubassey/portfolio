import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import { ResendClient, SupportedApiClient, SystemHealthClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { HelloworldAppModule, type HelloworldAppModuleEnvironmentKeys } from "../../common/server";

import { APP_NAME } from "../appName";

export type HelloworldClassicModuleParametersEnvironmentKeys = HelloworldAppModuleEnvironmentKeys;

interface HelloworldClassicModuleParameters {
	environmentRegistry: EnvironmentRegistry<HelloworldClassicModuleParametersEnvironmentKeys>;
	healthClient: SystemHealthClient;
	resendClient: ResendClient;
	supportedClients: ReadonlyArray<SupportedApiClient>;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class HelloworldClassicModule extends HelloworldAppModule {
	constructor(parameters: HelloworldClassicModuleParameters) {
		super(parameters);
	}

	public getAppName(): string {
		return APP_NAME;
	}
}

export default HelloworldClassicModule;
