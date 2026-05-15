import { DeferredOperationBuilder } from "../operations";
import { ExecutionResult, OperationPipeline, PipelineContext } from "../pipelines";

/**
 * Abstract foundation managing data access behaviors for server-side infrastructure drivers.
 *
 * Exposes internal orchestration overloads to easily transition concrete, execution-deferred
 * database tasks or network requests into structured, type-safe operation pipeline tracks
 * without leaking web routing mechanics.
 */
export abstract class ServerComponentClient {
	protected create<Output>(
        action: () => Promise<ExecutionResult<Output>>
    ): DeferredOperationBuilder<Output>;

	protected create<Context extends PipelineContext, Output>(
        action: (context: Context) => Promise<ExecutionResult<Output>>
    ): OperationPipeline<Context, Output, Output>;

	protected create(action: Function): any {
        if(action.length === 0) {
            return new DeferredOperationBuilder(action as any);
        }
        return new OperationPipeline(action as any);
    }
}

export default ServerComponentClient;
