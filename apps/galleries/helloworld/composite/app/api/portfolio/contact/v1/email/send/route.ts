import { NextRequest } from "next/server";

import { CompositeStaticRouteDispatcherFactory } from "@otuekong-portfolio/exhibit/helloworld-composite-server";

export async function POST(request: NextRequest) {
	return CompositeStaticRouteDispatcherFactory
		.create()
		.sendEmailInquiry(request);
}
