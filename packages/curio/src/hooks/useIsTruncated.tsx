"use client";

import { useRef, useState, useLayoutEffect } from "react";

import useToggle from "./useToggle";

const useIsTruncated = () => {
	const [element, setElement] = useState<HTMLElement | null>(null);
	const [isTruncated, setIsTruncated] = useToggle(false);

	// Ref used to track state inside the observer without stale closures
	const isTruncatedRef = useRef(false);

	useLayoutEffect(() => {
		if(!element) return;

		const check = () => {
			// Using floor/ceil handles sub-pixel rounding jitter in flex layouts
			const hasOverflow = Math.ceil(element.scrollWidth) > Math.floor(element.clientWidth);

			if(hasOverflow !== isTruncatedRef.current) {
				isTruncatedRef.current = hasOverflow;
				setIsTruncated(hasOverflow);
			}
		};

		check();

		const observer = new ResizeObserver(() => {
			// rAF ensures we don't trigger updates during a layout/paint cycle
			window.requestAnimationFrame(check);
		});

		observer.observe(element);
		return () => observer.disconnect();
	}, [element]);

	return [isTruncated, setElement] as const;
};

useIsTruncated.displayName = "useIsTruncated";

export default useIsTruncated;
