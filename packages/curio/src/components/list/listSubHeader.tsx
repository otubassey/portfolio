"use client";

import { ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

const COLOR_CLASSES = {
	default: "text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900",
	primary: "text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800",
	inherit: "text-inherit bg-inherit"
} as const;

export interface ListSubHeaderProps {
	children: ReactNode;
	className?: string;
	color?: "default" | "primary" | "inherit";
	disableSticky?: boolean;
	divider?: boolean;
	ref?: Ref<HTMLLIElement>;
}

const ListSubHeader = ({
	children,
	className = "",
	color = "default",
	disableSticky = false,
	divider = false,
	ref
}: ListSubHeaderProps) => {
	return (
		<li
			ref={ref}
			className={CssUtils.mergeClasses(
				"px-3 py-2 text-xs font-semibold uppercase tracking-wider list-none",
				!disableSticky && "sticky top-0 z-10",
				divider && "border-b border-gray-200 dark:border-slate-700",
				COLOR_CLASSES[color],
				className
			)}>
			{children}
		</li>
	);
};

ListSubHeader.displayName = "ListSubHeader";

export default ListSubHeader;
