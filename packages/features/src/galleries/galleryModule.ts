import { ArchivesModule } from "@otuekong-portfolio/archives";
import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import { ResendClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { GalleryModuleEnvironmentKeys } from "./types";

interface GalleryModuleParameters {
	environmentRegistry: EnvironmentRegistry<GalleryModuleEnvironmentKeys>;
	resendClient: ResendClient;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class GalleryModule {
	private archivesModule: ArchivesModule | null = null;

	constructor(private readonly parameters: GalleryModuleParameters) {}

	public getArchivesModule(): ArchivesModule {
		if(!this.archivesModule) {
			this.archivesModule = new ArchivesModule({
				environmentRegistry: this.parameters.environmentRegistry,
				resendClient: this.parameters.resendClient,
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.archivesModule;
	}
}

export default GalleryModule;
