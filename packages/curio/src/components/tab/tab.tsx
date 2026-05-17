"use client";

import { ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

import { ButtonBase } from "../buttonBase";

export interface TabProps {
	children: ReactNode;
	className?: string;
	isSelected?: boolean;
	onClick?: () => void;
	ref?: Ref<HTMLButtonElement>;
}

const Tab = ({
	children,
	className,
	isSelected,
	onClick,
	ref,
	...props
}: TabProps) => (
	<ButtonBase
		{...props}
		ref={ref}
		aria-selected={isSelected}
		className={CssUtils.mergeClasses(
			"px-4 py-2 text-xs font-medium transition-colors border-b-2",
			"hover:bg-transparent",
			isSelected
				? "text-blue-400 border-blue-400 bg-gray-900/50"
				: "text-gray-400 border-transparent hover:text-gray-200",
			className
		)}
		onClick={onClick}
		role="tab">
		{children}
	</ButtonBase>
);

Tab.displayName = "Tab";

export default Tab;
