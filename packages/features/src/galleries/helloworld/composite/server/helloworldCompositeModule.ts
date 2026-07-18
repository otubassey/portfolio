import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import { ResendClient, SupportedApiClient, SystemHealthClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { HelloworldAppModule, type HelloworldAppModuleEnvironmentKeys } from "../../common/server";

import { APP_NAME } from "../appName";

export type HelloworldCompositeModuleParametersEnvironmentKeys = HelloworldAppModuleEnvironmentKeys;

interface HelloworldCompositeModuleParameters {
	environmentRegistry: EnvironmentRegistry<HelloworldCompositeModuleParametersEnvironmentKeys>;
	healthClient: SystemHealthClient;
	resendClient: ResendClient;
	supportedClients: ReadonlyArray<SupportedApiClient>;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class HelloworldCompositeModule extends HelloworldAppModule {
	constructor(parameters: HelloworldCompositeModuleParameters) {
		super(parameters);
	}

	public getAppName(): string {
		return APP_NAME;
	}
}

export default HelloworldCompositeModule;
