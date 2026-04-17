"use client";

import { useState, useLayoutEffect, RefObject } from "react";

interface FloatingConfig {
	isOpen: boolean;
	type: "menu" | "tooltip";
	offset?: number;
}

const useFloatingElement = (
	anchorRef: RefObject<HTMLElement | null>,
	{
		isOpen,
		type,
		offset = 8
	}: FloatingConfig
) => {
	const [style, setStyle] = useState<React.CSSProperties>({
		pointerEvents: "none",
		position: "fixed",
		visibility: "hidden"
	});

	useLayoutEffect(() => {
		if(!isOpen || !anchorRef.current) return;

		const update = () => {
			const anchor = anchorRef.current;
			if(!anchor) return;

			const rect = anchor.getBoundingClientRect();
			const viewportHeight = window.innerHeight;
			const elementExpectedHeight = type === "menu" ? 320 : 40;

			// Logic from your Menu: Flip if no space below
			const spaceBelow = viewportHeight - rect.bottom;
			const shouldFlip = spaceBelow < elementExpectedHeight && rect.top > elementExpectedHeight;

			const baseStyle: React.CSSProperties = {
				left: type === "menu" ? rect.left : rect.left + rect.width / 2,
				pointerEvents: type === "menu" ? "auto" : "none",
				position: "fixed",
				visibility: "visible",
				width: type === "menu" ? `${rect.width}px` : undefined,
				zIndex: 9999
			};

			if(shouldFlip) {
				baseStyle.top = rect.top - offset;
				baseStyle.transform = type === "menu" ? "translateY(-100%)" : "translate(-50%, -100%)";
			} else {
				baseStyle.top = rect.bottom + offset;
				baseStyle.transform = type === "menu" ? "none" : "translateX(-50%)";
			}

			setStyle(baseStyle);
		};

		update();
		window.addEventListener("resize", update);
		window.addEventListener("scroll", update, true);
		return () => {
			window.removeEventListener("resize", update);
			window.removeEventListener("scroll", update, true);
		};
	}, [anchorRef, isOpen, offset, type]);

	return {
		isFlipped: style.transform?.includes("-100%"),
		style
	};
};

useFloatingElement.displayName = "useFloatingElement";

export default useFloatingElement;
