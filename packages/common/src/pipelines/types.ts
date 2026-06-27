/**
 * Open marker interface. Concrete implementations (like HttpContext)
 * will extend this to define their specific properties.
 */
export interface PipelineContext {}

export type PipelineDirective<Context> =
    | { action: "CONTINUE"; context: Context }
    | { action: "SHORT_CIRCUIT"; response: any };

/**
 * Acts as an interlocking transform interceptor. It receives the active context state,
 * returns a directive to continue or halt.
 */
export type PreHook<Context extends PipelineContext> = (
    context: Context
) => Promise<PipelineDirective<Context>> | PipelineDirective<Context>;

/**
 * Post-Execution Hook contract. Takes input from the previous step
 * in the chain and transforms or structuralizes it.
 */
export type PostHook<Input, Output> = (
    result: Input
) => Promise<Output> | Output;
