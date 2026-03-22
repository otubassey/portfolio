"use client";

import { ElementType, HTMLAttributes, ReactNode, Ref, useMemo } from "react";

import { CssUtils } from "../../utils";

import { ListContext, ListContextValue } from "./listContext";
import { ListStylePosition, ListStyleType } from "./constants";

const STYLES_BY_LIST_STYLE_POSITION: Record<typeof ListStylePosition[keyof typeof ListStylePosition], string> = {
	[ListStylePosition.INSIDE]: "list-inside",
	[ListStylePosition.OUTSIDE]: "list-outside"
} as const;

const STYLES_BY_LIST_STYLE_TYPE: Record<typeof ListStyleType[keyof typeof ListStyleType] | string, string> = {
	circle: "list-[circle]",
	decimal: "list-decimal",
	disc: "list-disc",
	none: "list-none",
	stretch: "list-stretch",
	square: "list-[square]"
};

export type ListProps = HTMLAttributes<HTMLElement> & {
	children?: ReactNode;
	className?: string;
	component?: ElementType;
	fullWidth?: boolean;
	listStylePosition?: typeof ListStylePosition[keyof typeof ListStylePosition];
	listStyleType?: typeof ListStyleType[keyof typeof ListStyleType];
	ref?: Ref<HTMLElement>;
};

const List = ({
	children,
	className,
	component: Component = "ul",
	fullWidth = false,
	listStylePosition = "outside",
	listStyleType = "none",
	ref,
	...props
}: ListProps) => {
	const value = useMemo<ListContextValue>(() => ({
		listStylePosition,
		listStyleType
	}), [listStylePosition, listStyleType]);
	const isInheritListStyleType = listStyleType === "inherit";
	const hasMarker = listStyleType && listStyleType !== "none" && !isInheritListStyleType;
	return (
		<ListContext value={value}>
			<Component
				ref={ref}
				className={CssUtils.mergeClasses(
					"list-variation-base",
					fullWidth && "w-full",
					STYLES_BY_LIST_STYLE_POSITION[listStylePosition],
					isInheritListStyleType && "allow-markers",
					// Boolean(listStyleType) && !isInheritListStyleType && STYLES_BY_LIST_STYLE_TYPE[listStyleType],
					hasMarker && STYLES_BY_LIST_STYLE_TYPE[listStyleType],
					// FIX: Force children to be list-items if a type is selected
					// This handles vanilla <li> tags automatically
					hasMarker && "[&>li]:list-item [&>li]:mb-4",
					className
				)}
				{...props}>
				{children}
			</Component>
		</ListContext>
	);
};

List.displayName = "List";

export default List;
