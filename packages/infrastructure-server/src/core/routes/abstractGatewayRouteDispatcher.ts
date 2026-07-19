import { NotFoundError, ServiceUnavailableError, ValidationError } from "@otuekong-portfolio/common/errors";
import { HttpRequestUtils, KnownHttpHeaders } from "@otuekong-portfolio/common/utils";

import { SupportedApiClient } from "../../types";

import { ControllerRegistry } from "../httpController";
import { HttpRequest, HttpResponse } from "../types";

import BaseRouteDispatcher from "./baseRouteDispatcher";
import { RouteExecutorFactory } from "./routeExecutor";

/**
 * @class AbstractGatewayRouteDispatcher
 *
 * @description Provides a dynamic, runtime reverse-proxy router engine for federated monorepo application deployment routing.
 * Evaluates dynamic catch-all route segments (`/api/[...slug]`), inspects incoming url pathways,
 * maps targets against a centralized controller registry matrix, and delegates request orchestration dynamically.
 *
 * @example
 * // apps/gateway/src/app/api/[...slug]/route.ts
 * export const ALL = async (req: HttpRequest) => AbstractGatewayRouteDispatcher.dispatchRequest(req);
 */
abstract class AbstractGatewayRouteDispatcher<IContainer, IRequest, IResponse> extends BaseRouteDispatcher<IContainer, IRequest, IResponse> {
    constructor(
		private readonly supportedClients: ReadonlyArray<SupportedApiClient>,
		private readonly controllerRegistry: ControllerRegistry,
		routeExecutorFactory: RouteExecutorFactory<IContainer, IRequest, IResponse>
	) {
		super(routeExecutorFactory);
	}

    protected async internalDispatchRequest(request: HttpRequest): Promise<HttpResponse> {
        const slugSegments = this.getSlugSegments(request.url);
		const transactionId = HttpRequestUtils.getTransactionId(request.headers);

        if(slugSegments.length === 0) {
            return this.mapNotFoundErrorHttpResponse(
				"Gateway evaluation failed: Empty or missing deployment routing segments.",
				transactionId
			);
        }

		const targetAppKeyOrErrorResponse = this.getTargetAppKey(request.headers, transactionId);

		if(typeof targetAppKeyOrErrorResponse !== "string") {
			return targetAppKeyOrErrorResponse;
		}

        const controllers = this.controllerRegistry.get(targetAppKeyOrErrorResponse);

		if(!controllers || controllers.length === 0) {
            return this.mapServiceUnavailableErrorHttpResponse(
				"Deployment evaluation failed: Target context application is unmapped or unavailable.",
				transactionId
			);
        }

		const remainingPath = slugSegments.join("/");
		const matchedController = controllers
			.find(controller => controller.canHandle(request.method, remainingPath));

        if(!matchedController) {
            return this.mapNotFoundErrorHttpResponse(
				"Endpoint routing evaluation failed: The request path pattern or verb configuration could not be resolved.",
				transactionId
			);
        }

        return await matchedController.dispatch(request, remainingPath);
    }

	private getSlugSegments(url: string): ReadonlyArray<string> {
		const urlObj = new URL(url);
        const pathSegments = urlObj.pathname.split("/").filter(Boolean);
        const apiIndex = pathSegments.indexOf("api");
        return pathSegments.slice(apiIndex + 1);
	}

	private getTargetAppKey(requestHeaders: Map<string, string>, transactionId?: string): string | HttpResponse {
		try {
			const clientId = HttpRequestUtils.getRequiredHeader(requestHeaders, KnownHttpHeaders.X_CLIENT_ID);
			const targetAppId = HttpRequestUtils.getRequiredHeader(requestHeaders, KnownHttpHeaders.X_TARGET_APP_ID);

			const activeSupportedClients = this.supportedClients.filter(client => client.active);

			if(activeSupportedClients.length !== 1 || activeSupportedClients[0].name !== clientId) {
				return this.mapUnprocessableErrorHttpResponse(
					"Requires an active supported api client to serve this request.",
					transactionId
				);
			}

			const isTargetAppIdSupported = this.supportedClients
				.some(client => (!client.active && client.name === targetAppId));

			if(!isTargetAppIdSupported) {
				return this.mapUnprocessableErrorHttpResponse(
					"Requires a supported target api client to serve this request.",
					transactionId
				);
			}

			return targetAppId;
		} catch (error) {
			const validationError = ValidationError.Builder()
				.withDetail((error as ValidationError).detail)
				.withMessage((error as ValidationError).message)
				.withTransactionId(transactionId)
				.build();

			return {
				status: validationError.statusCode,
				data: null,
				error: validationError
			};
		}
	}

	private mapNotFoundErrorHttpResponse(errorDetail: string, transactionId?: string): HttpResponse {
        const notFoundError = new NotFoundError(
            "The requested resource could not be located.",
            errorDetail,
			transactionId
        );

        return {
            status: notFoundError.statusCode,
            data: null,
            error: notFoundError
        };
    }

	private mapServiceUnavailableErrorHttpResponse(
		errorDetail: string,
		transactionId?: string
	): HttpResponse {
        const notFoundError = new ServiceUnavailableError(
            "The requested resource could not be located.",
            errorDetail,
			transactionId
        );

        return {
            status: notFoundError.statusCode,
            data: null,
            error: notFoundError
        };
    }

	private mapUnprocessableErrorHttpResponse(
		errorDetail: string,
		transactionId?: string
	): HttpResponse {
		const validationError = ValidationError.Builder()
			.withDetail(errorDetail)
			.withTransactionId(transactionId)
			.build();

		return {
			status: validationError.statusCode,
			data: null,
			error: validationError
		};
	}
}

export default AbstractGatewayRouteDispatcher;
