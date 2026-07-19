import { Resend } from "resend";

import {
	ConfigurationError,
	DeferredOperationBuilder,
	EnvironmentRegistry,
	FalloutError,
	LoggerProvider,
	OperationPipeline,
	OperationResult,
	ServerComponentClient
} from "@otuekong-portfolio/common";

import { ServerComponentHealth, ServerComponentMonitor } from "../../types";

import { ResendEnvironmentKeys } from "./types";

export interface SendEmailParams {
	origin: string;
	sender: string;
	subject: string;
	target: string | Array<string>;
	text: string;
	html?: string;
}

/**
 * Isolated server-only interface managing email transport transactions via the Resend SDK.
 *
 * Orchestrates parameterized transactional email pipelines, and handles runtime validation
 * failures gracefully to expose live health check telemetry.
 */
class ResendClient extends ServerComponentClient implements ServerComponentMonitor {
	private readonly CONFIGURATION_ERROR_MESSAGE = "Courier initialization failed";

	private readonly logger;

	private driverInstance: Resend | null = null;

	constructor(
		private readonly environmentRegistry: EnvironmentRegistry<ResendEnvironmentKeys>,
		private readonly loggerProvider: LoggerProvider
	) {
		super();

		if(!environmentRegistry) {
			throw new ConfigurationError(
				this.CONFIGURATION_ERROR_MESSAGE,
				"Missing required environment registry initialization parameters."
			);
		}

		if(!loggerProvider) {
			throw new ConfigurationError(
				this.CONFIGURATION_ERROR_MESSAGE,
				"Missing required LoggerProvider initialization parameters."
			);
		}

		this.logger = this.loggerProvider.getLogger("ResendClient");
	}

	private get driver(): Resend {
        if(!this.driverInstance) {
            this.driverInstance = new Resend(this.environmentRegistry.get("RESEND_API_KEY"));
        }
        return this.driverInstance;
    }

	health(): DeferredOperationBuilder<ServerComponentHealth> {
		let startTime: number;

        return this.create(async (): Promise<OperationResult<ServerComponentHealth>> => {
			try {
				startTime = performance.now();

				// Due to the the current restricted permission scope, this is intended to trigger
				// a dummy no-op send transaction
				const driverResponse = await this.driver.emails.send({
					from: "", // Intentionally blank parameter forces a fast, safe metadata check
					to: ["health@check.local"],
					subject: "Heartbeat",
					html: ""
				});

				if(driverResponse?.error) {
					throw driverResponse.error;
				}

				return {
					success: true,
					data: {
						isHealthy: true,
						latencyMs: Math.round(performance.now() - startTime),
						timestamp: new Date().toISOString()
					},
					error: null
				};
			} catch (error) {
				// A validation error means the key successfully bypassed authentication
                const isAuthValid = (error as any)?.name === "validation_error" ||
					(error as any)?.statusCode === 422;

				if(!isAuthValid) {
					this.logger.error("[Resend key diagnostics failed]:", (error as Error));

					return {
						success: true,
						data: {
							isHealthy: false,
							latencyMs: Math.round(performance.now() - startTime),
							timestamp: new Date().toISOString()
						},
						error: null
					};
				}

				return {
					success: true,
					data: {
						isHealthy: true,
						latencyMs: Math.round(performance.now() - startTime),
						timestamp: new Date().toISOString()
					},
					error: null
				};
			}
        });
	}

	sendEmail(): OperationPipeline<SendEmailParams, any, any> {
        return this.create(async (payload: SendEmailParams): Promise<OperationResult<any>> => {
			try {
				payload.target = this.environmentRegistry.get("PORTFOLIO_EMAIL_TARGET");

				const driverResponse = await this.driver.emails.send({
					from: payload.sender,
					to: [payload.target].flat(),
					subject: payload.subject,
					text: payload.text,
					html: payload.html
				});
				if(driverResponse?.error) {
					return this.mapSendEmailErrorResponse(driverResponse.error);
                }
				return {
					success: true,
					data: driverResponse,
					error: null
				};
			} catch (error) {
				return this.mapSendEmailErrorResponse(error);
			}
        });
	}

	private mapSendEmailErrorResponse(error: any): OperationResult<any> {
		const falloutError = new FalloutError(
			"Upstream mailer rejection",
			`The external email infrastructure service failed to process the submission payload. ${error?.message || ""}`,
			502
		);
		return {
			success: false,
			data: null,
			error: falloutError
		};
	}
}

export default ResendClient;
