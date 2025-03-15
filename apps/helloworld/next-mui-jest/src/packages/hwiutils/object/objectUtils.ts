class ObjectUtils {
    /**
     * Checks if the given object has the specified property.
     * 
     * @param {unknown} object - The object to check.
     * @param {string} propertyName - The name of the property to look for.
     * @returns {boolean} true if the property exists in the object, false otherwise.
     * 
     * @example
     * ```js
     * import {ObjectUtils} from "@/packages/hwiutils"; 
     * 
     * const sampleObject = {key: "value"};
     * const mapSample = new Map();
     * 
     * console.log(ObjectUtils.hasProperty(sampleObject, "key")); // prints true
     * console.log(ObjectUtils.hasProperty(sampleObject, "nonExistentKey")); // prints false
     * console.log(ObjectUtils.hasProperty(mapSample, "has")); // prints true
     * console.log(ObjectUtils.hasProperty([1, 2, 3], "length")); // prints false - due to the `!Array.isArray` check in `isObject(...)` method
     * console.log(ObjectUtils.hasProperty(null, "property")); // prints false
     * console.log(ObjectUtils.hasProperty("string", "length")); // prints false
     * ```
     */
    hasProperty(object: unknown, propertyName: string): boolean {
        if(!propertyName || !this.isObject(object)) return false;
        return Object.prototype.hasOwnProperty.call(object, propertyName);
    }

    /**
     * Checks if the provided object is empty.
     * 
     * An object is considered empty if it has no enumerable properties, including both string and symbol keys.
     * @param {object} object - The object to check for emptiness.
     * @returns {boolean} True if the object is empty, false otherwise.
     * 
     * @example
     * ```js
     * import {ObjectUtils} from "@/packages/hwiutils";
     * 
     * console.log(ObjectUtils.isEmpty({})); // prints true
     * console.log(ObjectUtils.isEmpty({[Symbol("key")]: "value"})); // prints false
     * console.log(ObjectUtils.isEmpty({key: "value"})); // prints false
     */
    isEmpty(object: unknown): boolean {
        return this.isObject(object)
            && Object.keys(object as object).length === 0
            && Object.getOwnPropertySymbols(object).length === 0;
    }

    /**
     * Checks if the given value is strictly an object and not a `Array`, `Function`, or `null` (even though they're all objects in Javascript).
     * 
     * @param {unknown} value - The value to check.
     * @returns {boolean} True if the object is an object, false otherwise.
     * 
     * @example
     * ```js
     * import {ObjectUtils} from "@/packages/hwiutils";
     *
     * console.log(ObjectUtils.isObject("")); // prints false
     * console.log(ObjectUtils.isObject("random")); // prints false
     * console.log(ObjectUtils.isObject(5)); // prints false
     * console.log(ObjectUtils.isObject(true)); // prints false
     * console.log(ObjectUtils.isObject(undefined)); // prints false
     * console.log(ObjectUtils.isObject(null)); // prints false
     * console.log(ObjectUtils.isObject([])); // prints false
     * console.log(ObjectUtils.isObject(() => {})); // prints false
     * console.log(ObjectUtils.isObject({})); // prints true
     * console.log(ObjectUtils.isObject({name: "John"})); // prints true
     * ```
     */
    isObject(value: unknown): boolean {
        return Boolean(value) && typeof value === "object" && !Array.isArray(value);
    }
}

export default new ObjectUtils();
