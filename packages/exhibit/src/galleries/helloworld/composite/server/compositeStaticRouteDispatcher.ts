import { NextRequest, NextResponse } from "next/server";

import { ExhibitContext } from "@otuekong-portfolio/exhibit/common-server";
import { AbstractStaticRouteDispatcher, RouteExecutorFactory } from "@otuekong-portfolio/infrastructure-server/core";

import HelloworldCompositeContainer from "./helloworldCompositeContainer";

class CompositeStaticRouteDispatcher extends AbstractStaticRouteDispatcher<HelloworldCompositeContainer, NextRequest, NextResponse> {
	constructor(routeExecutorFactory: RouteExecutorFactory<HelloworldCompositeContainer, NextRequest, NextResponse>) {
		super(routeExecutorFactory);
	}

	protected getContainer(): HelloworldCompositeContainer {
		return ExhibitContext.get<HelloworldCompositeContainer>();
	}

	public getSystemHealth(request: NextRequest) {
		return this.executeAction((httpRequest) => (
			this.getContainer()
				.getSystemHealthController()
				.dispatch(httpRequest, "portfolio/health")
		))(request);
	}

	public sendEmailInquiry(request: NextRequest) {
		return this.executeAction((httpRequest) => (
			this.getContainer()
				.getSendEmailInquiryController()
				.dispatch(httpRequest, "portfolio/contact/v1/email/send")
		))(request);
	}
}

export default CompositeStaticRouteDispatcher;
