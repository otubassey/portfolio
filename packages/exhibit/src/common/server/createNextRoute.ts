import { NextRequest, NextResponse } from "next/server";

import { ResourceHandler } from "@otuekong-portfolio/infrastructure-server";

import NextRouteHandler from "./nextRouteHandler";

/**
 * Higher-order utility generating standard execution boundaries for any Resource Handler.
 */
const createNextRoute = (handler: ResourceHandler<any, any>) => {
    const routeAdapter = new NextRouteHandler(handler);
    return async (req: NextRequest): Promise<NextResponse> => await routeAdapter.handle(req);
};

export default createNextRoute;
