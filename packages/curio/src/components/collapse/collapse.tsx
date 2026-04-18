"use client";

import { ReactNode, HTMLAttributes, Ref, CSSProperties } from "react";

import { CssUtils } from "../../utils";

const getCssSize = (size: string | number) => (
	typeof size === "number" ? `${size}px` : size
);

export interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
	collapsedSize?: string | number;
	expand?: boolean;
	orientation?: "horizontal" | "vertical";
	ref?: Ref<HTMLDivElement>;
	style?: CSSProperties;
}

const Collapse = ({
	children,
	className,
	collapsedSize = 0,
	expand = false,
	orientation = "vertical",
	ref,
	style,
	...props
}: CollapseProps) => {
	const isVertical = orientation === "vertical";
	const dimension = isVertical ? "maxHeight" : "maxWidth";
	const collapsedDimension = isVertical ? getCssSize(collapsedSize) : "0px";

	return (
		<div
			ref={ref}
			className={CssUtils.mergeClasses(
				"transition-all duration-300 ease-in-out overflow-hidden",
				className
			)}
			style={{
				...style,
				// When closed: use collapsedSize (vertical only). When open: use a large enough max value.
				[dimension]: expand ? "1000px" : collapsedDimension,
				opacity: (!expand && collapsedSize === 0) ? 0 : 1,
				visibility: (!expand && collapsedSize === 0) ? "hidden" : "visible"
			}}
			{...props}>
			{children}
		</div>
	);
};

Collapse.displayName = "Collapse";

export default Collapse;
