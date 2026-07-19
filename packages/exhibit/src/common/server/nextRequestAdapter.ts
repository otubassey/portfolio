import { NextRequest, NextResponse } from "next/server";

import { ipAddress } from "@vercel/functions";

import { ConfigurationError, ErrorMapper } from "@otuekong-portfolio/common";
import { HttpResponse, ResourceHandler } from "@otuekong-portfolio/infrastructure-server";

/**
 * Adapts platform-specific Next.js App Router transactions (`NextRequest`/`NextResponse`)
 * into a framework-agnostic execution model (`HttpRequest`/`HttpResponse`).
 *
 * Centralizes request stream parsing, query normalization, Vercel edge IP resolution,
 * and global boundary error handling to ensure domain logic handlers remain entirely
 * decoupled from the web infrastructure layer.
 *
 * @template TBody - The expected data schema shape of the parsed inbound payload body.
 * @template TOutput - The expected data schema shape of the outbound success response.
 */
class NextRequestAdapter {
    constructor(
        private readonly resourceHandler: ResourceHandler<any, any>
    ) {
		if(!resourceHandler) {
            throw new ConfigurationError(
				"NextRequestAdapter Initialization Failed",
				"NextRequestAdapter requires a valid, concrete ResourceHandler instance to bind."
			);
        }
	}

    /**
     * Translates Next.js platform streams into framework-agnostic execution models.
     */
    public async handle(nextRequest: NextRequest): Promise<NextResponse> {
        try {
            const body = nextRequest.method !== "GET"
				? await nextRequest.json().catch(() => ({}))
				: {};

            const httpRequest = {
                body,
                ip: ipAddress(nextRequest) || nextRequest.headers.get("x-forwarded-for") || "127.0.0.1",
                url: nextRequest.url,
                method: nextRequest.method,
                headers: new Map(nextRequest.headers.entries()),
				transactionId: crypto.randomUUID()
            };

            const httpResponse = await this.resourceHandler
				.handle(httpRequest);

			const responsePayload = this.mapResponseBody(httpResponse);

            return NextResponse.json(responsePayload, {
                status: httpResponse.status,
                headers: httpResponse.headers instanceof Map
					? Object.fromEntries(httpResponse.headers.entries())
					: httpResponse.headers
            });
        } catch (error: any) {
			const { body, headers, status } = ErrorMapper.toResponse(error);

			return NextResponse.json(
				body,
				{
					headers,
					status
				}
			);
        }
    }

	private mapResponseBody(httpResponse: HttpResponse<any>): any {
		if(!httpResponse.error) {
			return httpResponse.data;
		}
		const {body} = ErrorMapper.toResponse(httpResponse.error);
		return body;
	}

}

export default NextRequestAdapter;
