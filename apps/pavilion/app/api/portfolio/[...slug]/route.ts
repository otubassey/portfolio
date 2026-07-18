import { NextRequest } from "next/server";

import { PavilionGatewayRouteDispatcherFactory } from "@otuekong-portfolio/exhibit/pavilion-server";

export const dynamic = "force-dynamic";

export async function catchAllGateway(request: NextRequest) {
	return PavilionGatewayRouteDispatcherFactory
		.create()
		.dispatchRequest(request);
}

export {
	catchAllGateway as DELETE,
	catchAllGateway as GET,
	catchAllGateway as POST,
	catchAllGateway as PUT
};
