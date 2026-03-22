"use client";

import { useRef } from "react";

const UNINITIALIZED = Symbol("uninitialized");

/**
 * Returns a value that remains stable across re-renders.
 *
 * Unlike useState, this never triggers re-renders and handles React StrictMode
 * double-mounting correctly. The value is computed/assigned only once on the
 * first render.
 *
 * @param value - Either a direct value or a factory function that returns a value
 * @returns The stable value that persists across re-renders
 *
 * @example
 * ```tsx
 * // With factory function
 * const id = useStableValue(() => generateUniqueId());
 *
 * // With direct value
 * const timestamp = useStableValue(Date.now());
 *
 * // With context function
 * const index = useStableValue(getNextIndex);
 * ```
 */
function useStableValue<T>(value: T | (() => T)): T {
	const ref = useRef<T | typeof UNINITIALIZED>(UNINITIALIZED);

	if(ref.current === UNINITIALIZED) {
		ref.current = typeof value === "function" ? (value as () => T)() : value;
	}

	return ref.current as T;
}

export default useStableValue;
