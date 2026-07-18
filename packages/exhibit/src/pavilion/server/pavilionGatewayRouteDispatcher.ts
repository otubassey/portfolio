import { NextRequest, NextResponse } from "next/server";

import { ExhibitContext } from "@otuekong-portfolio/exhibit/common-server";
import { SupportedApiClient } from "@otuekong-portfolio/infrastructure-server";
import { AbstractGatewayRouteDispatcher, ControllerRegistry, RouteExecutorFactory } from "@otuekong-portfolio/infrastructure-server/core";

import PavilionContainer from "./pavilionContainer";

class PavilionGatewayRouteDispatcher extends AbstractGatewayRouteDispatcher<PavilionContainer, NextRequest, NextResponse> {
	constructor(
		supportedClients: ReadonlyArray<SupportedApiClient>,
		controllerRegistry: ControllerRegistry,
		routeExecutorFactory: RouteExecutorFactory<PavilionContainer, NextRequest, NextResponse>
	) {
		super(supportedClients, controllerRegistry, routeExecutorFactory);
	}

	protected getContainer(): PavilionContainer {
		return ExhibitContext.get<PavilionContainer>();
	}

	public dispatchRequest(request: NextRequest) {
		const isCronTrigger =
			request.headers.has("authorization") &&
			request.headers.get("user-agent")?.includes("Vercel-Cron"); // Vercel adds this header tag

		if(isCronTrigger) {
			return this.executeCron((httpRequest) => (
				this.internalDispatchRequest(httpRequest)
			))(request);
		}

		return this.executeAction((httpRequest) => (
			this.internalDispatchRequest(httpRequest)
		))(request);
	}
}

export default PavilionGatewayRouteDispatcher;
