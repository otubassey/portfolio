import { NextRequest, NextResponse } from "next/server";

import { EnvironmentRegistry, ErrorMapper, ILogger, LoggerProvider, UnauthorizedError } from "@otuekong-portfolio/common";
import { HttpRequest, HttpResponse, RouteExecutor } from "@otuekong-portfolio/infrastructure-server";

import NextHttpMapper from "./nextHttpMapper";

/**
 * Centrally executes pure core handlers within the Next.js boundary edge.
 * Orchestrates mapping data input formats and converting responses.
 */
class NextRouteExecutor<EnvironmentKeys extends string> implements RouteExecutor<NextRequest, NextResponse> {
	private readonly logger: ILogger;

	constructor(
		private readonly environmentRegistry: EnvironmentRegistry<EnvironmentKeys>,
		loggerProvider: LoggerProvider
	) {
		this.logger = loggerProvider.getLogger("NextRouteExecutor");
	}

    public async execute(
        nextRequest: NextRequest,
        action: (httpRequest: HttpRequest) => Promise<HttpResponse>
    ): Promise<NextResponse> {
        try {
        	const httpRequest = await NextHttpMapper.toHttpRequest(nextRequest);

            const domainResponse = await action(httpRequest);

            return NextHttpMapper.toNextResponse(domainResponse);
        } catch (error) {
			const { body, headers, status } = ErrorMapper.toResponse(error);
			this.logger.error(JSON.stringify(body));

			return NextResponse.json(
				body,
				{
					headers,
					status
				}
			);
        }
    }

	public async executeCron(
		nextRequest: NextRequest,
		action: (httpRequest: HttpRequest) => Promise<HttpResponse>
	): Promise<NextResponse> {
		try {
			const authHeader = nextRequest.headers.get("authorization");
			const cronSecret = this.environmentRegistry.get("CRON_SECRET" as EnvironmentKeys);

			if(!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
				this.logger.warn("Unauthorized cron invocation attempt intercepted.");

				throw UnauthorizedError.Builder()
					.withMessage("Cron invocation authorization failed")
					.withDetail("The provided authorization bearer token is missing or does not match the platform environment contract.")
					.build();
			}

			return await this.execute(nextRequest, action);
		} catch (error) {
			const { body, headers, status } = ErrorMapper.toResponse(error);
			this.logger.error(JSON.stringify(body));

			return NextResponse.json(
				body,
				{
					headers,
					status
				}
			);
		}
	}

}

export default NextRouteExecutor;
