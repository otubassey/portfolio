import { ConfigurationError, NotFoundError } from "@otuekong-portfolio/common/errors";
import { HttpRequestUtils, StringUtils } from "@otuekong-portfolio/common/utils";

import { HttpMethod } from "./httpMethod";
import { HttpRequest, HttpResponse } from "./types";

export type ControllerRegistry = Map<string, ReadonlyArray<HttpController>>;

export type ControllerMethod = <Output, Input>(request: HttpRequest<Input>) => (
	Promise<HttpResponse<Output>> | HttpResponse<Output>
);

interface RouteMapping {
    method: typeof HttpMethod[keyof typeof HttpMethod] | (string & {});
    pathPattern: string;
    handler: ControllerMethod;
}

abstract class HttpController {
    private readonly routes: Array<RouteMapping> = [];

    protected constructor(
		protected readonly appName: string,
		private readonly basePath: string = ""
	) {}

    public canHandle(httpMethod: HttpRequest["method"], path: string): boolean {
		const pathSegments = path.split("/").filter(Boolean);
        const firstSegment = pathSegments[0];
		const basePathIndex = pathSegments.indexOf(this.basePath);
		const remainingPathSegments = pathSegments.slice(basePathIndex + 1);
		const remainingPath = `/${remainingPathSegments.join("/")}`;
        return this.basePath === firstSegment
			&& this.routes.some(route => (route.pathPattern === remainingPath && route.method === httpMethod));
    }

    /**
     * Routes internal traffic to the mapped method based on verb and path matching
     */
    public async dispatch(request: HttpRequest, path: string): Promise<HttpResponse> {
        // Strip the basePath segment to match sub-paths (e.g., "contact/inquiry" -> "inquiry")
        const controllerSubPath = path.replace(new RegExp(`^${this.basePath}?`), "");

		const matchedRouteMethods = this.routes
			.filter(route => StringUtils.equalsIgnoreCase(route.method, request.method));

		const strictRouteMatch = matchedRouteMethods.find(route => (
			route.pathPattern === controllerSubPath
			|| (route.pathPattern === "" && controllerSubPath === "")
		));

		if(!strictRouteMatch) {
            return {
                data: null,
                error: NotFoundError.Builder()
					.withMessage("The requested resource could not be located.")
					.withDetail("Endpoint routing evaluation failed: The request path pattern or verb configuration could not be resolved.")
					.withTransactionId(HttpRequestUtils.getTransactionId(request.headers))
					.build(),
				headers: request.headers,
                status: 404
            };
        }

        return await strictRouteMatch.handler(request);
    }

    protected registerRoute(
		method: RouteMapping["method"],
		pathPattern: RouteMapping["pathPattern"],
		handler: RouteMapping["handler"]
	): void {
		const normalizedMethod = method.trim().toUpperCase();
        const normalizedPath = pathPattern.trim();

		const isDuplicate = this.routes.some(route =>
            StringUtils.equalsIgnoreCase(route.method, normalizedMethod)
				&& StringUtils.equalsIgnoreCase(route.pathPattern, normalizedPath)
        );

		if(isDuplicate) {
            throw new ConfigurationError(
                "Route Registration Collision",
                `Controller '${this.constructor.name}' already contains a registered route mapping for [${normalizedMethod}] "${this.basePath}/${normalizedPath}".`
            );
        }

        this.routes.push({
			method: normalizedMethod,
			pathPattern: normalizedPath,
			handler
		});
    }

}

export default HttpController;
