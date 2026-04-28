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
		isOpen: Boolean(show && content),
		type: "tooltip"
	});

	return (
		<span
			ref={internalRef}
			className={CssUtils.mergeClasses(
				"relative inline-block w-full",
				className
			)}>

			{children}

			{content && show && createPortal(
			<div
				className={CssUtils.mergeClasses(
					"px-2 py-1",
					"text-xs font-medium text-white bg-gray-900 whitespace-nowrap",
					"rounded shadow-xl z-ps-tooltip pointer-events-none"
				)}
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
