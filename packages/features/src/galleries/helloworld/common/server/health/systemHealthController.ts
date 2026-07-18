import { BadRequestError } from "@otuekong-portfolio/common";
import { Validator } from "@otuekong-portfolio/common/validators";
import { HttpController, HttpRequest, HttpResponse } from "@otuekong-portfolio/infrastructure-server/core";

import { PortfolioRequestHeaders } from "../portfolioRequestValidator";

import SystemHealthService from "./systemHealthService";

class SystemHealthController extends HttpController {
    constructor(
		appName: string,
        private readonly systemHealthService: SystemHealthService,
		private readonly validator: Validator<PortfolioRequestHeaders>
    ) {
        super(appName, "portfolio");

        this.registerRoute("GET", "/health", (req) => this.checkHealth(req));
    }

	private async checkHealth(request: HttpRequest): Promise<HttpResponse> {
		const requestIp = request.ip ?? "";

		if(!requestIp) {
			return {
				data: null,
				error: BadRequestError.Builder()
					.withMessage("Missing required core payload elements.")
					.build(),
				headers: request.headers,
				status: 400
            };
        }

		const headersValidationResult = this.validator.validate(request.headers);

		if(!headersValidationResult.isValid) {
            return {
				data: null,
                error: !headersValidationResult.isValid
					? headersValidationResult.error
					: null,
				headers: request.headers,
                status: 422
            };
		}

		const serviceResult = await this.systemHealthService.execute({
			requestIp
		});

		if(!serviceResult.success && serviceResult.error) {
            return {
				data: null,
                error: serviceResult.error,
				headers: request.headers,
                status: (serviceResult.error as any).statusCode || 429
            };
        }

		const report = serviceResult.data || {};
        const hasOutage = Object.values(report).some((comp) => !comp.isHealthy);
		// Returns 503 Service Unavailable if any core engine is DOWN
        const systemStatus = hasOutage ? 503 : 200;

        return {
            data: report,
			error: null,
			headers: request.headers,
            status: systemStatus
        };
	}
}

export default SystemHealthController;
