import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import { HttpController, ResendClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { ContactModule, ContactModuleEnvironmentKeys } from "../../contact/server";

export type ArchivesModuleEnvironmentKeys = ContactModuleEnvironmentKeys;

interface ArchivesModuleParameters {
	appName: string;
	environmentRegistry: EnvironmentRegistry<ArchivesModuleEnvironmentKeys>;
	resendClient: ResendClient;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class ArchivesModule {
	private contactModule: ContactModule | null = null;
	private controllers: ReadonlyArray<HttpController> | null = null;

	constructor(private readonly parameters: ArchivesModuleParameters) {}

	public getContactModule(): ContactModule {
		if(!this.contactModule) {
			this.contactModule = new ContactModule({
				appName: this.parameters.appName,
				environmentRegistry: this.parameters.environmentRegistry,
				resendClient: this.parameters.resendClient,
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.contactModule;
	}

	public getHttpControllers(): ReadonlyArray<HttpController> {
		if(!this.controllers) {
			const contactModule = this.getContactModule();
			const contactControllers = contactModule.getHttpControllers();
			this.controllers = contactControllers;
		}
		return this.controllers;
	}
}

export default ArchivesModule;
