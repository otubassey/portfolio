import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import { HttpController, ResendClient, SupportedApiClient, SystemHealthClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { HelloworldClassicModule, HelloworldClassicModuleParametersEnvironmentKeys } from "../../classic/server";
import { HelloworldCompositeModule, HelloworldCompositeModuleParametersEnvironmentKeys } from "../../composite/server";

export type HelloworldModuleParametersEnvironmentKeys =
	| HelloworldClassicModuleParametersEnvironmentKeys
	| HelloworldCompositeModuleParametersEnvironmentKeys;

interface HelloworldModuleParameters {
	environmentRegistry: EnvironmentRegistry<HelloworldModuleParametersEnvironmentKeys>;
	healthClient: SystemHealthClient;
	resendClient: ResendClient;
	supportedClients: ReadonlyArray<SupportedApiClient>;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class HelloworldModule {
	private controllers: ReadonlyArray<HttpController> | null = null;
	private helloworldClassicModule: HelloworldClassicModule | null = null;
	private helloworldCompositeModule: HelloworldCompositeModule | null = null;

	constructor(private readonly parameters: HelloworldModuleParameters) {}

	public getHelloworldClassicModule(): HelloworldClassicModule {
		if(!this.helloworldClassicModule) {
			this.helloworldClassicModule = new HelloworldClassicModule({
				environmentRegistry: this.parameters.environmentRegistry,
				healthClient: this.parameters.healthClient,
				resendClient: this.parameters.resendClient,
				supportedClients: this.parameters.supportedClients,
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.helloworldClassicModule;
	}

	public getHelloworldCompositeModule(): HelloworldCompositeModule {
		if(!this.helloworldCompositeModule) {
			this.helloworldCompositeModule = new HelloworldCompositeModule({
				environmentRegistry: this.parameters.environmentRegistry,
				healthClient: this.parameters.healthClient,
				resendClient: this.parameters.resendClient,
				supportedClients: this.parameters.supportedClients,
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.helloworldCompositeModule;
	}

	public getHttpControllers(): ReadonlyArray<HttpController> {
		if(!this.controllers) {
			const classicModuleControllers = this.getHelloworldClassicModule()
				.getHttpControllers();

			const compositeModuleControllers = this.getHelloworldCompositeModule()
				.getHttpControllers();

			this.controllers = [
				...classicModuleControllers,
				...compositeModuleControllers
			];
		}
		return this.controllers;
	}

}

export default HelloworldModule;
