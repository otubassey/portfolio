import { NextRequest, NextResponse } from "next/server";

import { ipAddress } from "@vercel/functions";

import { ErrorMapper, HttpRequestUtils, KnownHttpHeaders } from "@otuekong-portfolio/common";
import { HttpRequest, HttpResponse } from "@otuekong-portfolio/infrastructure-server";

class NextHttpMapper {

    public static async toHttpRequest(nextRequest: NextRequest): Promise<HttpRequest> {
        const body = nextRequest.method !== "GET"
            ? await nextRequest.json().catch(() => ({}))
            : {};

		const headers = HttpRequestUtils.entriesToMap(nextRequest.headers.entries());

        return {
            body,
            headers,
            ip: ipAddress(nextRequest)
				|| HttpRequestUtils.getHeader(headers, KnownHttpHeaders.X_FORWARDED_FOR)
				|| "",
            method: nextRequest.method,
            url: nextRequest.url
        };
    }

    public static toNextResponse(domainResponse: HttpResponse): NextResponse {
		const responsePayload = this.mapResponseBody(domainResponse);

		const headers = domainResponse.headers instanceof Map
			? Object.fromEntries(HttpRequestUtils.extractResponseHeaders(domainResponse.headers.entries()))
			: {};

		if(domainResponse.status === 204) {
			return new NextResponse(null, {
				headers,
				status: 204
			});
		}

        return NextResponse.json(responsePayload, {
            status: domainResponse.status,
            headers
        });
    }

	private static mapResponseBody(httpResponse: HttpResponse): any {
		if(!httpResponse.error) {
			return httpResponse.data;
		}
		const {body} = ErrorMapper.toResponse(httpResponse.error);
		return body;
	}

}

export default NextHttpMapper;
