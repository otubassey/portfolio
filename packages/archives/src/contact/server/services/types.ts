import { PipelineContext, OperationPipeline } from "@otuekong-portfolio/common";
import { ResendClient } from "@otuekong-portfolio/infrastructure-server";

import { ContactFormField, EmailHttpResponse } from "../../ui";

export interface EmailContext extends PipelineContext {
    url: string;
    data: ContactFormField;
    targetOverride: string;
}

/**
 * Clean architectural contract for creating backend handler execution pipelines.
 */
export type BackendEmailPipelineFactory = (
    endpointUrl: string,
    formData: ContactFormField,
    client: ResendClient
) => OperationPipeline<EmailContext, any, EmailHttpResponse>;

const SendEmailHandlerEnvironmentVariable = {
	EMAIL_SENDER: "PORTFOLIO_EMAIL_SENDER"
} as const;

export type SendEmailHandlerEnvironmentKeys = typeof SendEmailHandlerEnvironmentVariable[keyof typeof SendEmailHandlerEnvironmentVariable];
