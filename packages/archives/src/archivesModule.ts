import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import { ResendClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { ContactModule } from "./contact";
import { ArchivesModuleEnvironmentKeys } from "./types";

interface ArchivesModuleParameters {
	environmentRegistry: EnvironmentRegistry<ArchivesModuleEnvironmentKeys>;
	resendClient: ResendClient;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class ArchivesModule {
	private contactModule: ContactModule | null = null;

	constructor(private readonly parameters: ArchivesModuleParameters) {}

	public getContactModule(): ContactModule {
		if(!this.contactModule) {
			this.contactModule = new ContactModule({
				environmentRegistry: this.parameters.environmentRegistry,
				resendClient: this.parameters.resendClient,
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.contactModule;
	}
}

export default ArchivesModule;
