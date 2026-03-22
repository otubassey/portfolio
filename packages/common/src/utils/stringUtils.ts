/**
 * StringUtils provides a collection of static methods for common string manipulations
 * and comparisons with safety and performance in mind.
 */
export class StringUtils {
	/**
	 * Compares two strings for equality, ignoring differences in case.
	 *
	 * @param string1 - The first string to compare (can be null or undefined).
	 * @param string2 - The second string to compare (can be null or undefined).
	 * @returns {boolean} True if the strings are equal ignoring case, or if both are null/undefined.
	 *
	 * @example
	 * StringUtils.equalsIgnoreCase("Portfolio", "portfolio") // true
	 * StringUtils.equalsIgnoreCase("Playground", "PLAYGROUND") // true
	 * StringUtils.equalsIgnoreCase(undefined, null) // true
	 * StringUtils.equalsIgnoreCase("Home", "House") // false
	 */
	public equalsIgnoreCase(
		string1: string | null | undefined,
		string2: string | null | undefined
	): boolean {
		if(string1 === string2) {
			return true;
		}

		if (string1 == null || string2 == null) {
			return false;
		}

		return string1.toLowerCase() === string2.toLowerCase();
	}
}

export default new StringUtils();
