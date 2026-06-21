import { SystemHealthHandler } from "@otuekong-portfolio/infrastructure-server";

import { HealthServiceHandler } from "./server";

interface CommonModuleParameters {
	sendHealthInquiryHandler: SystemHealthHandler;
}

class CommonModule {
	private healthServiceHandler: HealthServiceHandler | null = null;

	constructor(private readonly parameters: CommonModuleParameters) {}

	public getHealthServiceHandler(): HealthServiceHandler {
		if(!this.healthServiceHandler) {
			this.healthServiceHandler = new HealthServiceHandler(
				this.parameters.sendHealthInquiryHandler
			);
		}
		return this.healthServiceHandler;
	}
}

export default CommonModule;
