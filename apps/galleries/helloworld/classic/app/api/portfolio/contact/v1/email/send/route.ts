import { NextRequest } from "next/server";

import { ClassicStaticRouteDispatcherFactory } from "@otuekong-portfolio/exhibit/helloworld-classic-server";

export async function POST(request: NextRequest) {
	return ClassicStaticRouteDispatcherFactory
		.create()
		.sendEmailInquiry(request);
}
