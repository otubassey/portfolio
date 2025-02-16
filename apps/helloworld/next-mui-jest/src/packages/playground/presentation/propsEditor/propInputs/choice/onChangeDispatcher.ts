type OnInputChange = ((this: unknown, ...args: Array<unknown>) => void) | undefined;

/**
 * Creates a composite change event handler that dispatches change events to multiple callback functions.
 *
 * @param {unknown} this - The `this` context within each callback will be preserved from the original call to the returned dispatcher function.
 * @param {Array<OnInputChange>} callbacks - A variable number of callback functions (or `undefined`) to be invoked when the returned dispatcher
 *                                          function is called.
 * @returns {OnInputChange} A single function that, when called, will invoke each provided callback with the same arguments.
 *
 * @example
 * ```typescript
 * const dispatcher = onChangeDispatcher.call(
 *  {},
 *  (event: Event) => console.log("First callback", event),
 *  (event: Event) => console.log("Second callback", event)
 * );
 *
 * dispatcher({target: {value: "new value"}});
 * ```
 */
function onChangeDispatcher(this: unknown, ...callbacks: Array<OnInputChange>): OnInputChange {
    return (...args) => {
        const cbs = Array.isArray(callbacks) ? callbacks : [];
        cbs
            .filter(callback => typeof callback === "function")
            .forEach((callback) => {
                callback?.apply(this, args);
            });
    };
}

export default onChangeDispatcher;
