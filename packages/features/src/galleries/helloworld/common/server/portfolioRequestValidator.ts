import { HttpRequestUtils, KnownHttpHeaders, ValidationError } from "@otuekong-portfolio/common";
import { ValidationResult, Validator } from "@otuekong-portfolio/common/validators";
import { SupportedApiClient } from "@otuekong-portfolio/infrastructure-server";
import { HttpRequest } from "@otuekong-portfolio/infrastructure-server/core";

export interface PortfolioRequestHeaders {
	clientId: string | null;
	targetAppId: string | undefined;
}

class PortfolioRequestValidator implements Validator<PortfolioRequestHeaders> {
	constructor(
		private readonly appName: string,
		private readonly supportedClients: ReadonlyArray<SupportedApiClient>
	) {}

	public validate(
		requestHeaders: HttpRequest["headers"]
	): ValidationResult<PortfolioRequestHeaders> {
		try {
			const clientId = HttpRequestUtils.getRequiredHeader(requestHeaders, KnownHttpHeaders.X_CLIENT_ID);
			const targetAppId = HttpRequestUtils.getHeader(requestHeaders, KnownHttpHeaders.X_TARGET_APP_ID);

			const activeSupportedClients = this.supportedClients.filter(client => client.active);
			if(activeSupportedClients.length !== 1) {
				return this.mapErrorResponse("An active api client is required to serve this request.");
			}

			const isClientIdValid = this.appName === clientId
				|| this.supportedClients.some(client => (client.name === clientId));

			const isTargetAppIdValid = !targetAppId || this.supportedClients.some(client => (client.name === targetAppId));

			if(!isClientIdValid || !isTargetAppIdValid) {
				return this.mapErrorResponse(`Required HTTP header is missing or invalid.`);
			}

			return {
				isValid: true,
				data: {
					clientId,
					targetAppId
				},
				error: null
			};
		} catch (error) {
			const validationError = ValidationError.Builder()
				.withDetail((error as ValidationError).detail)
				.withMessage((error as ValidationError).message)
				.build();

			return {
				isValid: false,
				data: null,
				error: validationError
			};
		}
	}

	private mapErrorResponse(errorDetail: string): ValidationResult<PortfolioRequestHeaders> {
		const validationError = ValidationError.Builder()
			.withDetail(errorDetail)
			.build();

		return {
			isValid: false,
			data: null,
			error: validationError
		};
	}
}

export default PortfolioRequestValidator;
