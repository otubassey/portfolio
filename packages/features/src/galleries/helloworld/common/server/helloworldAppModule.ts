import { ArchivesModule, ArchivesModuleEnvironmentKeys, SendEmailInquiryController } from "@otuekong-portfolio/archives/server";
import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import { HttpController, ResendClient, SupportedApiClient, SystemHealthClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { default as InternalCommonModule } from "./commonModule";
import { SystemHealthController } from "./health";

export type HelloworldAppModuleEnvironmentKeys = ArchivesModuleEnvironmentKeys;

interface HelloworldAppModuleParameters {
	environmentRegistry: EnvironmentRegistry<HelloworldAppModuleEnvironmentKeys>;
	healthClient: SystemHealthClient;
	resendClient: ResendClient;
	supportedClients: ReadonlyArray<SupportedApiClient>;
	withRateLimitPreHook: WithRateLimitPreHook;
}

abstract class HelloworldAppModule {
	private archivesModule: ArchivesModule | null = null;
	private commonModule: InternalCommonModule | null = null;
	private controllers: ReadonlyArray<HttpController> | null = null;
	private sendEmailInquiryController: SendEmailInquiryController | null = null;
	private systemHealthController: SystemHealthController | null = null;

	constructor(private readonly parameters: HelloworldAppModuleParameters) {}

	public getSendEmailInquiryController(): SendEmailInquiryController {
		if(!this.sendEmailInquiryController) {
			const archivesModule = this.getArchivesModule();

			this.sendEmailInquiryController = archivesModule
				.getContactModule()
				.getSendEmailInquiryController();
		}
		return this.sendEmailInquiryController;
	}

	public getSystemHealthController(): SystemHealthController {
		if(!this.systemHealthController) {
			const commonModule = this.getCommonModule();

			this.systemHealthController = commonModule.getSystemHealthController();
		}
		return this.systemHealthController;
	}

	public getHttpControllers(): ReadonlyArray<HttpController> {
		if(!this.controllers) {
			const archivesControllers = this.getArchivesModule()
				.getHttpControllers();

			const commonControllers = this.getCommonModule()
				.getHttpControllers();

			this.controllers = [
				...archivesControllers,
				...commonControllers
			];
		}
		return this.controllers;
	}

	public abstract getAppName(): string;

	private getArchivesModule(): ArchivesModule {
		if(!this.archivesModule) {
			this.archivesModule = new ArchivesModule({
				appName: this.getAppName(),
				environmentRegistry: this.parameters.environmentRegistry,
				resendClient: this.parameters.resendClient,
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.archivesModule;
	}

	private getCommonModule(): InternalCommonModule {
		if(!this.commonModule) {
			this.commonModule = new InternalCommonModule({
				appName: this.getAppName(),
				healthClient: this.parameters.healthClient,
				supportedClients: this.parameters.supportedClients,
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.commonModule;
	}
}

export default HelloworldAppModule;
