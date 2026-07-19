import { SendEmailInquiryController } from "@otuekong-portfolio/archives/serverIndex";
import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import {
	SystemHealthController as HelloworldSystemHealthController
} from "@otuekong-portfolio/features/helloworld-server";
import {
	HelloworldClassicModule as FeaturesHelloworldClassicModule,
	type HelloworldClassicModuleParametersEnvironmentKeys as FeaturesHelloworldClassicModuleParametersEnvironmentKeys
} from "@otuekong-portfolio/features/helloworld-classic-server";
import { ResendClient, SystemHealthClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";
import { APP_NAME_HELLOWORLD_CLASSIC } from "@otuekong-portfolio/features/helloworld-client";

interface HelloworldClassicModuleModuleParameters {
	environmentRegistry: EnvironmentRegistry<FeaturesHelloworldClassicModuleParametersEnvironmentKeys>;
	healthClient: SystemHealthClient,
	resendClient: ResendClient;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class HelloworldClassicModule {
	private featuresHelloworldClassicModule: FeaturesHelloworldClassicModule | null = null;
	private sendEmailInquiryController: SendEmailInquiryController | null = null;
	private systemHealthController: HelloworldSystemHealthController | null = null;

	constructor(private readonly parameters: HelloworldClassicModuleModuleParameters) {}

	public getSendEmailInquiryController(): SendEmailInquiryController {
		if(!this.sendEmailInquiryController) {
			const featuresHelloworldClassicModule = this.getFeaturesHelloworldClassicModule();

			this.sendEmailInquiryController = featuresHelloworldClassicModule.getSendEmailInquiryController();
		}
		return this.sendEmailInquiryController;
	}

	public getSystemHealthController(): HelloworldSystemHealthController {
		if(!this.systemHealthController) {
			const featuresHelloworldClassicModule = this.getFeaturesHelloworldClassicModule();

			this.systemHealthController = featuresHelloworldClassicModule.getSystemHealthController();
		}
		return this.systemHealthController;
	}

	private getFeaturesHelloworldClassicModule(): FeaturesHelloworldClassicModule {
		if(!this.featuresHelloworldClassicModule) {
			this.featuresHelloworldClassicModule = new FeaturesHelloworldClassicModule({
				environmentRegistry: this.parameters.environmentRegistry,
				healthClient: this.parameters.healthClient,
				resendClient: this.parameters.resendClient,
				supportedClients: [{
					name: APP_NAME_HELLOWORLD_CLASSIC,
					active: true
				}],
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.featuresHelloworldClassicModule;
	}
}

export default HelloworldClassicModule;
