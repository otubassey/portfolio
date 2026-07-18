import { ConfigurationError, OperationResult } from "@otuekong-portfolio/common";
import {
	DomainService,
	ServerComponentHealth,
	SystemHealthClient,
	WithRateLimitPreHook
} from "@otuekong-portfolio/infrastructure-server";

export interface SystemHealthServiceRequest {
	requestIp: string;
}

class SystemHealthService implements DomainService<SystemHealthServiceRequest, OperationResult<Record<string, ServerComponentHealth>>> {
    constructor(
        private readonly healthClient: SystemHealthClient,
        private readonly withRateLimitHook: WithRateLimitPreHook
    ) {
        if(!healthClient) {
            throw new ConfigurationError(
                "SystemHealthService Initialization Failed",
                "A valid SystemHealthClient driver instance must be supplied to construct the service."
            );
        }
    }

	async execute(
		input: SystemHealthServiceRequest
	): Promise<OperationResult<Record<string, ServerComponentHealth>>> {
		return await this.healthClient.checkHealth()
			.pipe()
			.before(this.withRateLimitHook(input.requestIp, "system-health-diagnostics", 5, "1m"))
			.execute() as OperationResult<Record<string, ServerComponentHealth>>;
	}
}

export default SystemHealthService;
