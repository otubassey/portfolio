import { BaseError } from "@otuekong-portfolio/common";
import { HttpMethod } from "./httpMethod";

export interface HttpResponse<DataType = any> {
	data: DataType | null;
	error: BaseError | null;
	status: number;
	headers?: Map<string, string>;
}

export interface HttpRequest<IRequest = any> {
    body: IRequest;
    headers: Map<string, string>;
    method: typeof HttpMethod[keyof typeof HttpMethod] | (string & {});
    url: string;
    ip?: string;
}

export interface ResourceHandler<IRequest, OResponse> {
    handle(request: HttpRequest<IRequest>): Promise<HttpResponse<OResponse>>;
}

export interface RouteHandlerContext {
    slug: string[];
    remainingPath: string;
}
