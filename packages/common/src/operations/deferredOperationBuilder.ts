import { ConfigurationError } from "../errors";
import { OperationPipeline } from "../pipelines";
import { OperationResult } from "../types";

/**
 * Runtime builder that encapsulates an immutable, deferred execution task.
 *
 * Defers executing critical operations until explicitly invoked, providing an internal mapping
 * method to transition the raw deferred task cleanly into an active operation pipeline tracker.
 */
class DeferredOperationBuilder<Output> {

    constructor(
        private readonly action: () => Promise<OperationResult<Output>>
    ) {
        if(!action || typeof action !== "function") {
            throw new ConfigurationError(
                "Operation Generation Failed",
                "A DeferredOperationBuilder must be supplied with a valid execution action."
            );
        }
    }

    public async invoke(): Promise<OperationResult<Output>> {
        return await this.action();
    }

    public pipe(): OperationPipeline<any, Output, Output> {
        return new OperationPipeline<any, Output, Output>(async (): Promise<OperationResult<Output>> => {
            return await this.invoke();
        });
    }
}

export default DeferredOperationBuilder;
