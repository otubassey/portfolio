import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import { FeaturesGalleryModule, FeaturesGalleryModuleEnvironmentKeys } from "@otuekong-portfolio/features/galleries";
import { ResendClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { ContactServiceHandler } from "./server";
import { GalleryModuleEnvironmentKeys } from "./types";

interface GalleryModuleParameters {
	environmentRegistry: EnvironmentRegistry<GalleryModuleEnvironmentKeys>;
	resendClient: ResendClient;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class GalleryModule {
	private contactServiceHandler: ContactServiceHandler | null = null;
	private featuresGalleryModule: FeaturesGalleryModule | null = null;

	constructor(private readonly parameters: GalleryModuleParameters) {}

	public getContactServiceHandler(): ContactServiceHandler {
		if(!this.contactServiceHandler) {
			const featuresGalleryModule = this.getFeaturesGalleryModule();
			this.contactServiceHandler = new ContactServiceHandler(
				featuresGalleryModule
					.getArchivesModule()
					.getContactModule()
					.getSendEmailHandler()
			);
		}
		return this.contactServiceHandler;
	}

	public getFeaturesGalleryModule(): FeaturesGalleryModule {
		if(!this.featuresGalleryModule) {
			this.featuresGalleryModule = new FeaturesGalleryModule({
				environmentRegistry: (
					this.parameters.environmentRegistry as EnvironmentRegistry<FeaturesGalleryModuleEnvironmentKeys>
				),
				resendClient: this.parameters.resendClient,
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.featuresGalleryModule;
	}
}

export default GalleryModule;
