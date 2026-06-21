import { ConfigurationError } from "@otuekong-portfolio/common";

import { WithRateLimitPreHook } from "../../redis/";
import { ServerComponentHealth } from "../../types";

import { HttpRequest, HttpResponse, ResourceHandler } from "../types";

import SystemHealthClient from "./systemHealthClient";

class SystemHealthHandler implements ResourceHandler<void, Record<string, ServerComponentHealth>> {

    constructor(
        private readonly healthClient: SystemHealthClient,
        private readonly withRateLimitHook: WithRateLimitPreHook
    ) {
        if(!healthClient) {
            throw new ConfigurationError(
                "SystemHealthHandler Initialization Failed",
                "A valid SystemHealthClient driver instance must be supplied to construct the handler."
            );
        }
    }

    public async handle(
        request: HttpRequest<void>
    ): Promise<HttpResponse<Record<string, ServerComponentHealth>>> {
		const healthPipeline = await this.healthClient.checkHealth()
			.pipe()
			.before(this.withRateLimitHook(request.ip, "system-health-diagnostics", 5, "1m"))
			.execute();

		if(!healthPipeline.success && healthPipeline.error) {
            return {
                status: (healthPipeline.error as any).statusCode || 429,
                error: healthPipeline.error,
				headers: (healthPipeline.error as any).headers
            };
        }

		const report = healthPipeline.data || {};
        const hasOutage = Object.values(report).some((comp) => !comp.isHealthy);
		// Returns 503 Service Unavailable if any core engine is DOWN
        const systemStatus = hasOutage ? 503 : 200;

        return {
            status: systemStatus,
            data: report,
            headers: new Map([["Cache-Control", "no-store, must-revalidate"]])
        };
    }
}

export default SystemHealthHandler;
