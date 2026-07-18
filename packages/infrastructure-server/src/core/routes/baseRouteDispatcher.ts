import { MissingDependencyError, UnimplementedError } from "@otuekong-portfolio/common";

import { HttpRequest, HttpResponse } from "../types";

import { RouteExecutorFactory } from "./routeExecutor";

/**
 * @class BaseRouteDispatcher
 *
 * @description Foundational abstract layer for building route dispatchers.
 */
abstract class BaseRouteDispatcher<IContainer, IRequest, IResponse> {
	constructor(private readonly routeExecutorFactory: RouteExecutorFactory<IContainer, IRequest, IResponse>) {
		if(!this.routeExecutorFactory) {
			throw new MissingDependencyError("BaseRouteDispatcher", "routeExecutorFactory");
		}
	}

	protected executeAction(actionRunner: (req: HttpRequest) => Promise<HttpResponse>) {
		return async (request: IRequest): Promise<IResponse> => {
			const routeExecutor = this.routeExecutorFactory(this.getContainer());
			return routeExecutor.execute(
				request,
				actionRunner
			);
		};
	}

	protected executeCron(actionRunner: (req: HttpRequest) => Promise<HttpResponse>) {
		return async (request: IRequest): Promise<IResponse> => {
			const routeExecutor = this.routeExecutorFactory(this.getContainer());
			return routeExecutor.executeCron(
				request,
				actionRunner
			);
		};
	}

	protected getContainer(): IContainer {
		throw new UnimplementedError(
			this.constructor.name,
			"getContainer"
		);
	}
}

export default BaseRouteDispatcher;
