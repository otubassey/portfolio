import BaseRouteDispatcher from "./baseRouteDispatcher";
import { RouteExecutorFactory } from "./routeExecutor";

/**
 * @class AbstractStaticRouteDispatcher
 *
 * @description Foundational abstract layer for building statically typed route dispatchers.
 * Abstracts request-response execution boundaries, feeding known controller actions
 * through a unified request lifecycle runner using method-level generic typing.
 *
 * @example
 * // apps/pavilion/src/app/api/hello/route.ts
 * export const GET = PavilionRouteDispatcher.getHello();
 */
abstract class AbstractStaticRouteDispatcher<IContainer, IRequest, IResponse> extends BaseRouteDispatcher<IContainer, IRequest, IResponse> {
	constructor(routeExecutorFactory: RouteExecutorFactory<IContainer, IRequest, IResponse>) {
		super(routeExecutorFactory);
	}
}

export default AbstractStaticRouteDispatcher;
