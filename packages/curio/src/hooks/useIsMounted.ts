"use client";

import { RefObject, useEffect, useRef } from "react";

/**
 * A hook that returns a ref indicating whether the component is currently mounted.
 *
 * This is the primary safety guard for preventing state updates on unmounted components
 * during asynchronous operations (Promises, timeouts, or event listeners).
 *
 * **Crucial Implementation Note:** This hook returns a `MutableRefObject<boolean>`.
 * Because it returns a Ref, it does **NOT** trigger a re-render when the status changes.
 * In async callbacks, you must check the `.current` property to get the most
 * up-to-date "live" status of the component, bypassing React's render closures.
 *
 * @returns A React Ref object where `.current` is `true` if mounted, and `false` otherwise.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMounted = useIsMounted();
 *   const [data, setData] = useState(null);
 *
 *   const handleAsyncAction = useCallback(async () => {
 *     const result = await api.getData();
 *
 *     // We check the LIVE ref value, which stays accurate even if
 *     // this function was defined many renders ago.
 *     if (isMounted.current) {
 *       setData(result);
 *     }
 *   }, [isMounted]); // isMounted ref is stable and won't trigger re-renders
 *
 *   return <button onClick={handleAsyncAction}>Fetch Data</button>;
 * }
 * ```
 */
function useIsMounted(): RefObject<boolean> {
	const isMountedRef = useRef<boolean>(false);

	useEffect(() => {
		isMountedRef.current = true;

		return () => {
			isMountedRef.current = false;
		};
	}, []);

	return isMountedRef;
}

useIsMounted.displayName = "useIsMounted";

export default useIsMounted;
