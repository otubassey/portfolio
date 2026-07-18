import { HttpController, SupportedApiClient, SystemHealthClient, WithRateLimitPreHook } from "@otuekong-portfolio/infrastructure-server";

import { SystemHealthController, SystemHealthService } from "./health";
import PortfolioRequestValidator from "./portfolioRequestValidator";

interface CommonModuleParameters {
	appName: string;
	healthClient: SystemHealthClient;
	supportedClients: ReadonlyArray<SupportedApiClient>;
	withRateLimitPreHook: WithRateLimitPreHook;
}

class CommonModule {
	private controllers: ReadonlyArray<HttpController> | null = null;
	private systemHealthController: SystemHealthController | null = null;
	private systemHealthService: SystemHealthService | null = null;

	constructor(private readonly parameters: CommonModuleParameters) {}

	public getHttpControllers(): ReadonlyArray<HttpController> {
		if(!this.controllers) {
			const systemHealthController = this.getSystemHealthController();
			this.controllers = [systemHealthController];
		}
		return this.controllers;
	}

	public getSystemHealthController(): SystemHealthController {
		if(!this.systemHealthController) {
			const systemHealthService = this.getSystemHealthService();
			this.systemHealthController = new SystemHealthController(
				this.parameters.appName,
				systemHealthService,
				new PortfolioRequestValidator(this.parameters.appName, this.parameters.supportedClients)
			);
		}
		return this.systemHealthController;
	}

	private getSystemHealthService(): SystemHealthService {
		if(!this.systemHealthService) {
			this.systemHealthService = new SystemHealthService(
				this.parameters.healthClient,
				this.parameters.withRateLimitPreHook
			);
		}
		return this.systemHealthService;
	}
}

export default CommonModule;
