import "../../../bootstrap";

import { NextRequest } from "next/server";

import { ClassicStaticRouteDispatcherFactory } from "@otuekong-portfolio/exhibit/helloworld-classic-server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
	return ClassicStaticRouteDispatcherFactory
		.create()
		.getSystemHealth(request);
}
