/**
 * Framework-agnostic business unit.
 */
interface DomainService<TInput = any, TOutput = any> {
    execute(input: TInput): Promise<TOutput> | TOutput;
}

export type { DomainService as default };
