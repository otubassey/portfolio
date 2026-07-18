import { HttpRequest, HttpResponse } from "../types";

export interface RouteExecutor<IRequest, IResponse> {
	execute: (
		nextRequest: IRequest,
        action: (httpRequest: HttpRequest) => Promise<HttpResponse>
	) => Promise<IResponse>;

	executeCron: (
		nextRequest: IRequest,
        action: (httpRequest: HttpRequest) => Promise<HttpResponse>
	) => Promise<IResponse>;
}

export type RouteExecutorFactory<Container, IRequest, IResponse> = (appContainer: Container) => RouteExecutor<IRequest, IResponse>;
