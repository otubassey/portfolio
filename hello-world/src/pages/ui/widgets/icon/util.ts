export function defaultIfFalsy<T = object | string>(expression: T | null | undefined, defaultValue: T): T {
    return Boolean(expression) ? expression as T : defaultValue;
}
