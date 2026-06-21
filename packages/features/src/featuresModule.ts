import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import { ResendClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { FeaturesGalleryModule } from "./galleries";
import { FeaturesModuleEnvironmentKeys } from "./types";

interface FeaturesModuleParameters {
	environmentRegistry: EnvironmentRegistry<FeaturesModuleEnvironmentKeys>;
	resendClient: ResendClient;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class FeaturesModule {
	private galleriesModule: FeaturesGalleryModule | null = null;

	constructor(private readonly parameters: FeaturesModuleParameters) {}

	public getGalleriesModule(): FeaturesGalleryModule {
		if(!this.galleriesModule) {
			this.galleriesModule = new FeaturesGalleryModule({
				environmentRegistry: this.parameters.environmentRegistry,
				resendClient: this.parameters.resendClient,
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.galleriesModule;
	}
}

export default FeaturesModule;
