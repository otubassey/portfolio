class BooleanUtils {
    private static readonly FALSE_STRING: string = "false";
    private static readonly TRUE_STRING: string = "true";

    /**
     * Determines if the given value is considered a boolean.
     * It does so by evaluating the type of the value and optionally 
     * parsing the value if it's a string to determine if its a boolean
     * string value ("true" or "false"). The case of the string is ignored
     * for the evaluation.
     *
     * @param {unknown} value - The value to evaluate. Can be of any type.
     * @param {boolean} checkBooleanString - An optional value to determine if a provided string
     *                                       value should be parsed from a boolean string before
     *                                       being evaluated. If `true` the string value is passed
     *                                       to {@method parse} and the result is passed to Boolean(...).
     * @returns {boolean} `true` if the value is a boolean type or if the value is a string that's
     *                     either "true" or "false", if {@param checkBooleanString} is `true`,
     *                     `false` otherwise.
     *
     * @example
     * ```js
     * import {BooleanUtils} from "@/packages/hwiutils";
     * 
     * console.log(BooleanUtils.isBoolean(true)); // prints true
     * console.log(BooleanUtils.isBoolean(false)); // prints true
     * console.log(BooleanUtils.isBoolean("true", true)); // prints true
     * console.log(BooleanUtils.isBoolean("false", true)); // prints true
     * console.log(BooleanUtils.isBoolean(1)); // prints false
     * console.log(BooleanUtils.isBoolean("hello")); // prints false
     * console.log(BooleanUtils.isBoolean(null)); // prints false
     * console.log(BooleanUtils.isBoolean(undefined)); // prints false
     * console.log(BooleanUtils.isBoolean("true")); // prints false
     * console.log(BooleanUtils.isBoolean("false")); // prints false
     * console.log(BooleanUtils.isBoolean("true", false)); // prints false
     * console.log(BooleanUtils.isBoolean("false", false)); // prints false
     * ```
     */
    isBoolean(value: unknown, checkBooleanString?: boolean): boolean {
        if(typeof value === "boolean") return true;
        return checkBooleanString && typeof value === "string"
            ? typeof this.parse(value) === "boolean"
            : false;
    }

    /**
     * Determines if the given value is considered false in a boolean context.
     * Also handles boolean values directly.
     *
     * @param {unknown} value - The value to evaluate. Can be of any type.
     * @param {boolean} checkBooleanString - An optional value to determine if a provided string
     *                                       value should be parsed from a boolean string before
     *                                       being evaluated. If `true` the string value is passed
     *                                       to {@method parse} and the result is passed to Boolean(...).
     * @returns {boolean} `true` if the value is falsy, `false` otherwise.
     *
     * @example
     * ```js
     * import {BooleanUtils} from "@/packages/hwiutils"; 
     *
     * console.log(BooleanUtils.isFalsy("")); // prints true
     * console.log(BooleanUtils.isFalsy("", true)); // prints true
     * console.log(BooleanUtils.isFalsy("random-text")); // prints false
     * console.log(BooleanUtils.isFalsy(0)); // prints true
     * console.log(BooleanUtils.isFalsy(0, true)); // prints true
     * console.log(BooleanUtils.isFalsy(1)); // prints false
     * console.log(BooleanUtils.isFalsy(1, true)); // prints false
     * console.log(BooleanUtils.isFalsy(-1)); // prints false
     * console.log(BooleanUtils.isFalsy(-1, true)); // prints false
     * console.log(BooleanUtils.isFalsy(null)); // prints true
     * console.log(BooleanUtils.isFalsy(null, true)); // prints true
     * console.log(BooleanUtils.isFalsy(true)); // prints false
     * console.log(BooleanUtils.isFalsy(true, true)); // prints false
     * console.log(BooleanUtils.isFalsy("true")); // prints false
     * console.log(BooleanUtils.isFalsy("true", true)); // prints false
     * console.log(BooleanUtils.isFalsy(false)); // prints true
     * console.log(BooleanUtils.isFalsy(false, true)); // prints true
     * console.log(BooleanUtils.isFalsy("false")); // prints false
     * console.log(BooleanUtils.isFalsy("false", true)); // prints true
     * console.log(BooleanUtils.isFalsy(undefined)); // prints true
     * console.log(BooleanUtils.isFalsy(undefined, true)); // prints true
     * ```
     */
    isFalsy(value: unknown, checkBooleanString?: boolean): boolean {
        return !this.isTruthy(value, checkBooleanString);
    }

    /**
     * Determines if the given value is considered true in a boolean context.
     * Also handles boolean values directly.
     *
     * @param {unknown} value - The value to evaluate. Can be of any type.
     * @param {boolean} checkBooleanString - An optional value to determine if a provided string
     *                                       value should be parsed from a boolean string before
     *                                       being evaluated. If `true` the string value is passed
     *                                       to {@method parse} and the result is passed to Boolean(...).
     * @returns {boolean} `true` if the value is truthy, `false` otherwise.
     *
     * @example
     * ```js
     * import {BooleanUtils} from "@/packages/hwiutils"; 
     *
     * console.log(BooleanUtils.isTruthy("")); // prints false
     * console.log(BooleanUtils.isTruthy("", true)); // prints false
     * console.log(BooleanUtils.isTruthy("random-text")); // prints true
     * console.log(BooleanUtils.isTruthy("random-text", true)); // prints false
     * console.log(BooleanUtils.isTruthy(0)); // prints false
     * console.log(BooleanUtils.isTruthy(0, true)); // prints false
     * console.log(BooleanUtils.isTruthy(1)); // prints true
     * console.log(BooleanUtils.isTruthy(1, true)); // prints true
     * console.log(BooleanUtils.isTruthy(-1)); // prints true
     * console.log(BooleanUtils.isTruthy(-1, true)); // prints true
     * console.log(BooleanUtils.isTruthy(null)); // prints false
     * console.log(BooleanUtils.isTruthy(null, true)); // prints false
     * console.log(BooleanUtils.isTruthy(true)); // prints true
     * console.log(BooleanUtils.isTruthy(true, true)); // prints true
     * console.log(BooleanUtils.isTruthy("true")); // prints true
     * console.log(BooleanUtils.isTruthy("true", true)); // prints true
     * console.log(BooleanUtils.isTruthy(false)); // prints false
     * console.log(BooleanUtils.isTruthy(false, true)); // prints false
     * console.log(BooleanUtils.isTruthy("false")); // prints true
     * console.log(BooleanUtils.isTruthy("false", true)); // prints false
     * console.log(BooleanUtils.isTruthy(undefined)); // prints false
     * console.log(BooleanUtils.isTruthy(undefined, true)); // prints false
     * ```
     */
    isTruthy(value: unknown, checkBooleanString?: boolean): boolean {
        if(typeof value === "boolean") return value;
        if(typeof value === "string" && checkBooleanString) return Boolean(this.parse(value));
        return Boolean(value);
    }

    /**
     * Parses a string and returns its boolean representation ignoring case.
     * This doesn't not consider other truthy/falsy values like numbers or empty strings.
     * This will return `undefined` for other strings other than "true" and "false".
     *
     * @param {string | null | undefined} value - The value to evaluate.
     * @returns {boolean | undefined} `true` if the string is `true`,
     *                                 `false` if the string is `false`, and `undefined` otherwise
     *                                  (which also includes returning `undefined` for other strings).
     *
     * @example
     * ```js
     * import {BooleanUtils} from "@/packages/hwiutils"; 
     *
     * console.log(BooleanUtils.parse("")); // prints undefined
     * console.log(BooleanUtils.parse("random-text")); // prints undefined
     * console.log(BooleanUtils.parse("1")); // prints undefined
     * console.log(BooleanUtils.parse(null)); // prints undefined
     * console.log(BooleanUtils.parse("true")); // prints true
     * console.log(BooleanUtils.parse("TrUe")); // prints true
     * console.log(BooleanUtils.parse("false")); // prints false
     * console.log(BooleanUtils.parse("FALSE")); // prints false
     * console.log(BooleanUtils.parse(undefined)); // prints undefined
     * ```
     */
    parse(value: string | null | undefined): boolean | undefined {
        if(typeof value !== "string") return undefined;
        if(value.toLocaleLowerCase() === BooleanUtils.FALSE_STRING) return false;
        if(value.toLocaleLowerCase() === BooleanUtils.TRUE_STRING) return true;
        return undefined;
    }

    /**
     * Toggles a boolean value: from true to false or vice-versa.
     *
     * @param {boolean} value - The boolean value to be toggled.
     * @returns {boolean} The opposite of the input boolean value.
     *
     * @example
     * ```js
     * import {BooleanUtils} from "@/packages/hwiutils"; 
     *
     * console.log(BooleanUtils.toggle(true)); // prints false
     * console.log(BooleanUtils.toggle(false)); // prints true
     * ```
     */
    toggle(value: boolean): boolean {
        return !value;
    }
}

export default new BooleanUtils();
