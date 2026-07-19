import "../../../bootstrap";

import { NextRequest } from "next/server";

import { CompositeStaticRouteDispatcherFactory } from "@otuekong-portfolio/exhibit/helloworld-composite-server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	return CompositeStaticRouteDispatcherFactory
		.create()
		.getSystemHealth(request);
}
