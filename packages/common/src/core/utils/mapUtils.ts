export interface ToMapOptions {
	/** If true, converts all string-based keys to lowercase. */
	lowercaseKeys?: boolean;
}

/**
 * High-utility helper class for manipulating native JavaScript Maps securely.
 */
class MapUtils {
	/**
	 * Converts a plain object/Record into a native JavaScript Map.
	 * Safely isolates lookups by breaking and discarding the Object prototype chain.
	 *
	 * @template K The expected type of the map keys (defaults to string)
	 * @template V The expected type of the map values
	 * @param obj The raw source record or object to convert
	 * @param options Configuration rules for the extraction
	 */
	public fromRecord<K extends string | number | symbol = string, V = any>(
		obj: Record<any, any> | null | undefined,
		options: ToMapOptions = {}
	): Map<K, V> {
		const resultMap = new Map<K, V>();

		if(!obj) {
			return resultMap;
		}

		// Reflect.ownKeys catches enumerable, non-enumerable, and Symbol keys
		const keys = Reflect.ownKeys(obj);

		for(const key of keys) {
			const stringKey = String(key);
			const lowerKey = stringKey.toLowerCase();

			// Strict Security: Block structural exploitation keys immediately
			if(lowerKey === "__proto__" || lowerKey === "constructor" || lowerKey === "prototype") {
				continue;
			}

			if(!Object.prototype.hasOwnProperty.call(obj, key)) {
				continue;
			}

			const value = obj[key as any];

			let finalKey = key;
			if(options.lowercaseKeys && typeof key === "string") {
				finalKey = lowerKey;
			}

			resultMap.set(finalKey as K, value as V);
		}

		return resultMap;
	}
}

export default new MapUtils();
