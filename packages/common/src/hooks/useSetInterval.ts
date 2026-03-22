"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * A declarative version of setInterval.
 *
 * @param callback - Function to execute.
 * @param delay - Milliseconds (number), or a "falsy" value (null | undefined | false) to pause.
 */
export function useSetInterval(
	callback: () => void,
	delay: number | null | undefined | false
) {
	const savedCallback = useRef(callback);

	useLayoutEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		if(typeof delay === "number") {
			const id = setInterval(() => savedCallback.current(), delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}

export default useSetInterval;
