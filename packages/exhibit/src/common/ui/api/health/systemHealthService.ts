import { ConfigurationError, OperationResult } from "@otuekong-portfolio/common";

import SystemHealthHttpClient, { SystemHealthReport } from "./systemHealthHttpClient";

class SystemHealthService {
    constructor(private readonly healthClient: SystemHealthHttpClient) {
        if(!healthClient) {
            throw new ConfigurationError(
                "Service Initialization Failed",
                "A valid SystemHealthHttpClient instance must be supplied to construct the SystemHealthService."
            );
        }
	}

    public async checkPlatformStatus(): Promise<OperationResult<SystemHealthReport>> {
        return await this.healthClient
			.checkHealth("/api/portfolio/v1/health")
			.execute();
    }
}

export default SystemHealthService;
