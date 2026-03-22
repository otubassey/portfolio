"use client";

import { useState, useCallback } from "react";

export interface ToggleFunction {
	(): void;
	(value: boolean): void;
	(fn: (prev: boolean) => boolean): void;
	(event: unknown): void;
}

/**
 * Hook to manage a boolean toggle state.
 *
 * Supports:
 * 1. toggle() -> flips state
 * 2. toggle(true) -> sets to true
 * 3. toggle(prev => !prev) -> functional update
 * 4. onClick={toggle} -> safely flips regardless of the Event object
 *
 * @param initialState - The starting boolean value (defaults to false).
 * @returns A tuple containing the boolean state and a smart toggle function.
 */
const useToggle = (initialState: boolean = false): [boolean, ToggleFunction] => {
	const [value, setValue] = useState<boolean>(initialState);

	const toggle = useCallback((nextValue?: boolean | ((prev: boolean) => boolean) | unknown) => {
    	setValue((current) => {
			if(typeof nextValue === "function") {
				return (nextValue as (previousValue: boolean) => boolean)(current);
			}
			if(typeof nextValue === "boolean") {
				return nextValue;
			}
			return !current;
		});
	}, []) as ToggleFunction;

  	return [value, toggle] as const;
};

export default useToggle;
