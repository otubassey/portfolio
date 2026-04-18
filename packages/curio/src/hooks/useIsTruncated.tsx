"use client";

import { useRef, useCallback } from "react";

import useToggle from "./useToggle";

const useIsTruncated = () => {
	const observerRef = useRef<ResizeObserver | null>(null);

	const [isTruncated, toggleIsTruncated] = useToggle(false);

	const targetRef = useCallback((node: HTMLElement | null) => {
        if(observerRef.current) {
            observerRef.current.disconnect();
        }

        if(node) {
            const check = () => {
                // Use clientWidth to ignore borders/padding for precision
                toggleIsTruncated(node.scrollWidth > node.clientWidth);
            };

            // Initial check after the node is available
            check();

            // Observe for future changes (window resizing, content updates)
            observerRef.current = new ResizeObserver(() => {
                window.requestAnimationFrame(check);
            });
            observerRef.current.observe(node);
        }
    }, []);

	return [isTruncated, targetRef] as const;
};

useIsTruncated.displayName = "useIsTruncated";

export default useIsTruncated;
