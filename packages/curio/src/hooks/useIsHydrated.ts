"use client";

import { useEffect, useState } from "react";

/**
 * A hook that returns a boolean indicating whether the React tree has successfully
 * hydrated on the client.
 *
 * This hook returns `false` during the initial server-side render (SSR) and the
 * first client-side pass, then flips to `true` via a re-render once the browser
 * takes control. This is the standard pattern for preventing "Hydration Mismatches"
 * when rendering browser-only APIs or dynamic data.
 *
 * **Note:** This intentionally triggers one additional re-render after the initial
 * paint to synchronize the UI. For tracking component disposal in async tasks
 * without re-rendering, use `useIsMounted` instead.
 *
 * @returns A boolean: `false` on server/first-pass, `true` after hydration.
 *
 * @example
 * ```tsx
 * function SearchBar() {
 *   const isHydrated = useIsHydrated();
 *
 *   // Only show the browser-native search focus shortcut after hydration
 *   return (
 *     <div>
 *       <input placeholder="Search..." />
 *       {isHydrated && <kbd className="shortcut">CMD + K</kbd>}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * function CodeBlock({ code }) {
 *   const isHydrated = useIsHydrated();
 *
 *   // Syntax highlighters often use browser-only globals (like window/document)
 *   // Render a static version on the server, then the interactive version on the client.
 *   return isHydrated ? (
 *     <SyntaxHighlighter code={code} />
 *   ) : (
 *     <pre><code>{code}</code></pre>
 *   );
 * }
 * ```
 */
function useIsHydrated(): boolean {
	const [hasMounted, setHasMounted] = useState<boolean>(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	return hasMounted;
}

useIsHydrated.displayName = "useIsHydrated";

export default useIsHydrated;
