import { BaseError, ConfigurationError, FalloutError, HttpError } from "../errors";

import { OperationResult, PipelineContext, PreHook, PostHook, PipelineDirective, ExecutionResult } from "./types";

/**
 * This is a framework-agnostic, strongly typed execution engine that encapsulates a deferred async operation (deferredPromise) inside
 * a structured lifecycle.
 *
 * It organizes cross-cutting concerns into an ordered stack of pre-execution hooks (before) and post-execution transformations (after),
 * automatically normalizing all raw or uncaught exceptions into an immutable, unified OperationResult<T> container.
 *
 * By acting as a predictable boundary layer, it guarantees that services and consumer hooks interact exclusively with clean domain data or robust,
 * trace-ready system errors.
 */
class OperationPipeline<
    Context extends PipelineContext,
    DeferredPromiseResult,
    Output
> {
    private readonly preHooks: Array<PreHook<Context>> = [];
    private readonly postHooks: Array<PostHook<any, any>> = [];
    private context: Context = {} as Context;

    /**
     * @param deferredPromise The unexecuted function wrapping the operational client call
     */
    constructor(
        private readonly deferredPromise: (context: Context) => Promise<ExecutionResult<DeferredPromiseResult>>
    ) {
		 if(!deferredPromise || typeof deferredPromise !== "function") {
            throw new ConfigurationError(
                "Pipeline initialization failed",
                "An OperationPipeline must be supplied with a valid, executable deferredPromise function."
            );
        }
	}

    /**
     * Explicitly attaches operational context to the pipeline when required.
     */
    public withContext(context: Context): this {
        this.context = context;
        return this;
    }

    public before(hook: PreHook<Context>): this {
        this.preHooks.push(hook);
        return this;
    }

    public after<DecoratedOutput>(
        hook: PostHook<Output, DecoratedOutput>
    ): OperationPipeline<Context, DeferredPromiseResult, DecoratedOutput> {
        this.postHooks.push(hook);
        return this as unknown as OperationPipeline<Context, DeferredPromiseResult, DecoratedOutput>;
    }

    public async execute(): Promise<OperationResult<Output>> {
        try {
            let currentContext = this.context;
            for(const hook of this.preHooks) {
				const directive: PipelineDirective<Context> = await hook(currentContext);

				if(directive.action === "SHORT_CIRCUIT") {
                    return {
                        data: directive.response as Output,
                        error: null,
                        success: true
                    };
                }
                currentContext = directive.context;
            }

			const executionResult: ExecutionResult<DeferredPromiseResult> = await this.deferredPromise(currentContext);

		    if(!executionResult.success || executionResult.error) {
                return {
                    data: null,
                    error: executionResult.error ? this.mapToApplicationError(executionResult.error) : null,
                    success: false
                };
            }

			let currentResult: any = executionResult.data;

            for(const hook of this.postHooks) {
                currentResult = await hook(currentResult);
            }

            return {
                data: currentResult as Output,
                error: null,
                success: true
            };
        } catch (error: any) {
            return {
                data: null,
                error: this.mapToApplicationError(error),
                success: false
            };
        }
    }

    private mapToApplicationError(error: any): BaseError {
		if(error instanceof HttpError) {
            return error;
        }
		return new FalloutError(
            "An unhandled operational runtime execution anomaly was intercepted.",
            error?.message || "No downstream error description was provided by the throwing engine thread context."
        );
    }
}

export default OperationPipeline;
