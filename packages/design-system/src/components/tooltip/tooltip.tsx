"use client";

import { ReactNode, Ref, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

import { useFloatingElement } from "../../hooks";
import { CssUtils } from "../../utils";

export interface TooltipProps {
	children: ReactNode;
	className?: string;
	content?: ReactNode;
	ref?: Ref<HTMLDivElement>;
	show?: boolean;
}

const Tooltip = ({
	children,
	className,
	content,
	ref,
	show = false
}: TooltipProps) => {
	const internalRef = useRef<HTMLDivElement>(null);

	useImperativeHandle(ref, () => internalRef.current!);

	const { style, isFlipped } = useFloatingElement(internalRef, {
		isOpen: Boolean(show),
		type: "tooltip"
	});

	if(!content) return <>{children}</>;

	return (
		<span
			ref={internalRef}
			className={CssUtils.mergeClasses("relative inline-block w-full", className)}>

			{children}

			{show && createPortal(
			<div
				className="px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-xl whitespace-nowrap z-ps-tooltip pointer-events-none"
				style={style}>

				{content}

				{/* Tooltip Arrow */}
				<div
					className={CssUtils.mergeClasses(
						"absolute left-1/2 -translate-x-1/2 border-4 border-transparent",
						isFlipped ? "top-full border-t-gray-900" : "bottom-full border-b-gray-900"
					)}
				/>

			</div>,
			document.body
			)}

		</span>
	);
};

Tooltip.displayName = "Tooltip";

export default Tooltip;
