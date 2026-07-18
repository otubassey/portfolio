import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import {
	FeaturesGalleryModule,
	FeaturesGalleryModuleEnvironmentKeys
} from "@otuekong-portfolio/features/galleries-server";
import { APP_NAME_HELLOWORLD_CLASSIC, APP_NAME_HELLOWORLD_COMPOSITE } from "@otuekong-portfolio/features/helloworld-client";
import { APP_NAME_PAVILION } from "@otuekong-portfolio/features/pavilion";
import { ControllerRegistry, ResendClient, SupportedApiClient, SystemHealthClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

interface HelloworldClassicModuleModuleParameters {
	environmentRegistry: EnvironmentRegistry<FeaturesGalleryModuleEnvironmentKeys>;
	healthClient: SystemHealthClient,
	resendClient: ResendClient;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class PavilionModule {
	private static SUPPORTED_API_CLIENTS: ReadonlyArray<SupportedApiClient> = Object.freeze([
		{
			name: APP_NAME_PAVILION,
			active: true
		},
		{
			name: APP_NAME_HELLOWORLD_CLASSIC,
			active: false
		},
		{
			name: APP_NAME_HELLOWORLD_COMPOSITE,
			active: false
		}
	] as const);

	private controllerRegistry: ControllerRegistry | null = null;
	private featuresGalleryModule: FeaturesGalleryModule | null = null;

	constructor(private readonly parameters: HelloworldClassicModuleModuleParameters) {}

	public getControllerRegistry(): ControllerRegistry {
		if(!this.controllerRegistry) {
			const featuresGalleryModule = this.getFeaturesGalleryModule();

			this.controllerRegistry = featuresGalleryModule.getControllerRegistry();
		}
		return this.controllerRegistry;
	}

	public getSupportedClients(): ReadonlyArray<SupportedApiClient> {
		return PavilionModule.SUPPORTED_API_CLIENTS;
	}

	private getFeaturesGalleryModule(): FeaturesGalleryModule {
		if(!this.featuresGalleryModule) {
			this.featuresGalleryModule = new FeaturesGalleryModule({
				environmentRegistry: this.parameters.environmentRegistry,
				healthClient: this.parameters.healthClient,
				resendClient: this.parameters.resendClient,
				supportedClients: this.getSupportedClients(),
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.featuresGalleryModule;
	}
}

export default PavilionModule;
