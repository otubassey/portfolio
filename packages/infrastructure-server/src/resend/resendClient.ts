import { Resend } from "resend";

import {
	ConfigurationError,
	DeferredOperationBuilder,
	ExecutionResult,
	FalloutError,
	OperationPipeline,
	ServerComponentClient
} from "@otuekong-portfolio/common";

import { EnvironmentRegistry } from "../server";
import { ServerComponentHealth, ServerComponentMonitor } from "../types";

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
	private driverInstance: Resend | null = null;

	constructor(
		private readonly environmentRegistry: typeof EnvironmentRegistry
	) {
		super();

		if(!environmentRegistry) {
			throw new ConfigurationError(
				"Courier initialization failed",
				"Missing required environment registry initialization parameters."
			);
		}
	}

	private get driver(): Resend {
        if(!this.driverInstance) {
            this.driverInstance = new Resend(this.environmentRegistry.RESEND_API_KEY);
        }
        return this.driverInstance;
    }

	health(): DeferredOperationBuilder<ServerComponentHealth> {
		let startTime: number;

        return this.create(async (): Promise<ExecutionResult<ServerComponentHealth>> => {
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
					// TODO: replace with logger
					console.error("[Resend key diagnostics failed]:", (error as any)?.message);

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
        return this.create(async (payload: SendEmailParams): Promise<ExecutionResult<any>> => {
			try {
				payload.target = this.environmentRegistry.CONTACT_FORM_RECIPIENT_EMAIL;

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

	private mapSendEmailErrorResponse(error: any): ExecutionResult<any> {
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
