import { SendEmailInquiryController } from "@otuekong-portfolio/archives/serverIndex";
import { EnvironmentRegistry } from "@otuekong-portfolio/common";
import {
	SystemHealthController as HelloworldSystemHealthController
} from "@otuekong-portfolio/features/helloworld-server";
import {
	HelloworldCompositeModule as FeaturesHelloworldCompositeModule,
	type HelloworldCompositeModuleParametersEnvironmentKeys as FeaturesHelloworldCompositeModuleParametersEnvironmentKeys,
} from "@otuekong-portfolio/features/helloworld-composite-server";
import { ResendClient, SystemHealthClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";
import { APP_NAME_HELLOWORLD_COMPOSITE } from "@otuekong-portfolio/features/helloworld-client";

interface HelloworldCompositeModuleModuleParameters {
	environmentRegistry: EnvironmentRegistry<FeaturesHelloworldCompositeModuleParametersEnvironmentKeys>;
	healthClient: SystemHealthClient,
	resendClient: ResendClient;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class HelloworldCompositeModule {
	private featuresHelloworldCompositeModule: FeaturesHelloworldCompositeModule | null = null;
	private sendEmailInquiryController: SendEmailInquiryController | null = null;
	private systemHealthController: HelloworldSystemHealthController | null = null;

	constructor(private readonly parameters: HelloworldCompositeModuleModuleParameters) {}

	public getSendEmailInquiryController(): SendEmailInquiryController {
		if(!this.sendEmailInquiryController) {
			const featuresHelloworldCompositeModule = this.getFeaturesHelloworldCompositeModule();

			this.sendEmailInquiryController = featuresHelloworldCompositeModule.getSendEmailInquiryController();
		}
		return this.sendEmailInquiryController;
	}

	public getSystemHealthController(): HelloworldSystemHealthController {
		if(!this.systemHealthController) {
			const featuresHelloworldCompositeModule = this.getFeaturesHelloworldCompositeModule();

			this.systemHealthController = featuresHelloworldCompositeModule.getSystemHealthController();
		}
		return this.systemHealthController;
	}

	private getFeaturesHelloworldCompositeModule(): FeaturesHelloworldCompositeModule {
		if(!this.featuresHelloworldCompositeModule) {
			this.featuresHelloworldCompositeModule = new FeaturesHelloworldCompositeModule({
				environmentRegistry: this.parameters.environmentRegistry,
				healthClient: this.parameters.healthClient,
				resendClient: this.parameters.resendClient,
				supportedClients: [{
					name: APP_NAME_HELLOWORLD_COMPOSITE,
					active: true
				}],
				withRateLimitPreHook: this.parameters.withRateLimitPreHook
			});
		}
		return this.featuresHelloworldCompositeModule;
	}
}

export default HelloworldCompositeModule;
