import { OperationPipeline, PipelineContext } from "@otuekong-portfolio/common";

export interface InfrastructurePipelineContext extends PipelineContext {
	url: string;
}

export type InfrastructurePipelineFactory = () => OperationPipeline<InfrastructurePipelineContext, Response, Response>;
