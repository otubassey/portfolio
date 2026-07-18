import { NextRequest, NextResponse } from "next/server";

import { ExhibitContext } from "@otuekong-portfolio/exhibit/common-server";
import { AbstractStaticRouteDispatcher, RouteExecutorFactory } from "@otuekong-portfolio/infrastructure-server/core";

import HelloworldClassicContainer from "./helloworldClassicContainer";

class ClassicStaticRouteDispatcher extends AbstractStaticRouteDispatcher<HelloworldClassicContainer, NextRequest, NextResponse> {
	constructor(routeExecutorFactory: RouteExecutorFactory<HelloworldClassicContainer, NextRequest, NextResponse>) {
		super(routeExecutorFactory);
	}

	protected getContainer(): HelloworldClassicContainer {
		return ExhibitContext.get<HelloworldClassicContainer>();
	}

	public getSystemHealth(request: NextRequest) {
		return this.executeCron((httpRequest) => (
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

export default ClassicStaticRouteDispatcher;
