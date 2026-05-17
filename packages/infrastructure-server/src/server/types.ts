import { BaseError } from "@otuekong-portfolio/common";

export interface HttpResponse<DataType> {
	data?: DataType;
	status: number;
	error?: BaseError | null;
	headers?: Map<string, string>;
}

export interface HttpRequest<IRequest = any> {
    body: IRequest;
    headers: Map<string, string>;
    method: "GET" | "POST" | "DELETE" | "PUT" | (string & {});
    url: string;
    ip?: string;
}

export interface ResourceHandler<IRequest, OResponse> {
    handle(req: HttpRequest<IRequest>): Promise<HttpResponse<OResponse>>;
}
