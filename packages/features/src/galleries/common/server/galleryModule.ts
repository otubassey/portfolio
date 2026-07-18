import { ArchivesModuleEnvironmentKeys } from "@otuekong-portfolio/archives/server";
import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import { ControllerRegistry, HttpController, ResendClient, SupportedApiClient, SystemHealthClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { HelloworldModule } from "../../helloworld/common/server";

export type GalleryModuleEnvironmentKeys = ArchivesModuleEnvironmentKeys;

interface GalleryModuleParameters {
	environmentRegistry: EnvironmentRegistry<GalleryModuleEnvironmentKeys>;
	healthClient: SystemHealthClient;
	resendClient: ResendClient;
	supportedClients: ReadonlyArray<SupportedApiClient>;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class GalleryModule {
	private controllerRegistry: ControllerRegistry | null = null;
	private helloworldModule: HelloworldModule | null = null;

	constructor(private readonly parameters: GalleryModuleParameters) {}

	public getHelloworldModule(): HelloworldModule {
		if(!this.helloworldModule) {
			this.helloworldModule = new HelloworldModule({
				environmentRegistry: this.parameters.environmentRegistry,
				healthClient: this.parameters.healthClient,
				resendClient: this.parameters.resendClient,
				supportedClients: this.parameters.supportedClients,
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.helloworldModule;
	}

	public getControllerRegistry(): ControllerRegistry {
		if(!this.controllerRegistry) {
			const featuresGalleryModule = this.getHelloworldModule();

			const helloworldClassicModule = featuresGalleryModule.getHelloworldClassicModule();

			const helloworldCompositeModule = featuresGalleryModule.getHelloworldCompositeModule();

			this.controllerRegistry = new Map<string, ReadonlyArray<HttpController>>([
				[helloworldClassicModule.getAppName(), helloworldClassicModule.getHttpControllers()],
				[helloworldCompositeModule.getAppName(), helloworldCompositeModule.getHttpControllers()]
			]);
		}
		return this.controllerRegistry;
	}
}

export default GalleryModule;
