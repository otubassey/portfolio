import { v4 as uuidV4 } from "uuid";

/**
 * Generates a universally unique identifier (UUID) v4 string.
 * 
 * This utility function leverages the `uuid` library to create UUIDs.
 *
 * @returns {string} A UUID v4 string.
 * 
 * @example
 * ```js
 * import {generateId} from "@/packages/hwiutils"; 
 *
 * console.log(generateId()); // prints f47ac10b-4284-95cc-a598-0e02b2c3d479
 * ```
 */
const generateId = (): string => uuidV4();

export default generateId;
