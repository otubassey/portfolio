class StringUtils {
    /**
     * Capitalizes the first letter of a string or the entire string if it's one character long.
     *
     * @param {string | null | undefined} text - The string to capitalize. If `null` or `undefined`, returns an empty string.
     * @param {boolean} localize - If `true`, locale-specific case mapping is used; otherwise, standard case mapping is used.
     * @returns {string} The capitalized string, or an empty string if the input is `null` or `undefined`.
     *
     * @example
     * ```js
     * import {StringUtils} from "@/packages/hwiutils"; 
     *
     * console.log(StringUtils.capitalize("hello", false)); // prints "Hello"
     * console.log(StringUtils.capitalize("hello", true)); // prints "Hello" (using locale-sensitive case conversion)
     * console.log(StringUtils.capitalize("a", false)); // prints "A"
     * console.log(StringUtils.capitalize("a", true)); // prints "A" (using locale-sensitive case conversion)
     * console.log(StringUtils.capitalize("")); // prints ""
     * console.log(StringUtils.capitalize(null, false)); // prints ""
     * console.log(StringUtils.capitalize(undefined, true)); // prints ""
     * console.log(StringUtils.capitalize("123", false)); // prints "123" (numbers are not converted)
     * ```
     */
    capitalize(text: string | null | undefined, localize?: boolean): string {
        if(!text) return "";
        const lowercasedText = this.toLowerCase(text, localize);
        if(lowercasedText.length === 0) return "";
        if(lowercasedText.length === 1) return this.toUpperCase(lowercasedText, localize);
        return `${this.toUpperCase(lowercasedText.charAt(0), localize)}${lowercasedText.slice(1)}`;
    }

    /**
     * Checks whether a text contains a search text irrespective of case. This is null and undefined safe.
     *
     * @param {string | null} text - Text the search is applied to
     * @param {string | null} searchText - Text to search for
     * @param {boolean} localize - Whether the string should be converted to lower case per locale or not
     * @returns {boolean} true or false indicating whether the searched text is included in the given text
     * 
     * @example
     * ```js
     * import {StringUtils} from "@/packages/hwiutils"; 
     *
     * console.log(StringUtils.includesIgnoreCase("Hello World", "He",  false)); // prints true
     * console.log(StringUtils.includesIgnoreCase("Hello World", "He",  true)); // prints true (using locale-sensitive case conversion)
     * console.log(StringUtils.includesIgnoreCase("Hello World", "no",  false)); // prints false
     * console.log(StringUtils.includesIgnoreCase("Hello World", "no",  true)); // prints false (using locale-sensitive case conversion)
     * console.log(StringUtils.includesIgnoreCase(null, "ok" false)); // prints false
     * console.log(StringUtils.includesIgnoreCase(undefined, "ok", true)); // prints false
     * console.log(StringUtils.includesIgnoreCase("okay", null, false)); // prints false
     * console.log(StringUtils.includesIgnoreCase("okay", undefined, true)); // prints false
     * ```
     */
    includesIgnoreCase(text: string | null | undefined, searchText: string | null | undefined, localize?: boolean): boolean {
        if(typeof text !== "string" || typeof searchText !== "string") return false;
        if(text === "" && searchText === "") return true;
        const lowercasedText = this.toLowerCase(text, localize);
        const lowercasedSearchText = this.toLowerCase(searchText, localize);
        return lowercasedText.includes(lowercasedSearchText);
    }

    /**
     * Converts a String to lower case per String.toLowerCase() or String.toLocaleLowerCase()
     *
     * @param {string | null} text - String to be converted to lower case
     * @param {boolean} localize - Whether the string should be converted to lower case per locale or not
     * @returns {string} converted string
     * 
     * @example
     * ```js
     * import {StringUtils} from "@/packages/hwiutils"; 
     *
     * console.log(StringUtils.toLowerCase("Hello", false)); // prints "hello"
     * console.log(StringUtils.toLowerCase("hELLô", true)); // prints "hellô" (using locale-sensitive case conversion)
     * console.log(StringUtils.toLowerCase("A", false)); // prints "a"
     * console.log(StringUtils.toLowerCase("A", true)); // prints "a" (using locale-sensitive case conversion)
     * console.log(StringUtils.toLowerCase(null, false)); // prints ""
     * console.log(StringUtils.toLowerCase(undefined, true)); // prints ""
     * ```
     */
    toLowerCase(text: string | null | undefined, localize?: boolean): string {
        if(!text) return "";
        return localize ? text.toLocaleLowerCase() : text.toLowerCase();
    }

    /**
     * Converts a String to lower case per String.toUpperCase() or String.toLocaleUpperCase()
     *
     * @param {string | null} text - String to be converted to upper case
     * @param {boolean} localize - Whether the string should be converted to upper case per locale or not
     * @returns {string} converted string
     *
     * @example
     * ```js
     * import {StringUtils} from "@/packages/hwiutils"; 
     *
     * console.log(StringUtils.toUpperCase("Hello", false)); // prints "HELLO"
     * console.log(StringUtils.toUpperCase("hELLô", true)); // prints "HELLÔ" (using locale-sensitive case conversion)
     * console.log(StringUtils.toUpperCase("a", false)); // prints "A"
     * console.log(StringUtils.toUpperCase("a", true)); // prints "A" (using locale-sensitive case conversion)
     * console.log(StringUtils.toUpperCase(null, false)); // prints ""
     * console.log(StringUtils.toUpperCase(undefined, true)); // prints ""
     * ```
     */
    toUpperCase(text: string | null | undefined, localize?: boolean): string {
        if(!text) return "";
        return localize ? text.toLocaleUpperCase() : text.toUpperCase();
    }
}

export default new StringUtils();
