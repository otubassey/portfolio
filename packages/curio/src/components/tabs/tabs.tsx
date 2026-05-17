"use client";

import { Children, cloneElement, isValidElement, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

export interface TabsProps {
	activeTab: number;
	children: ReactNode;
	onChange: (index: number) => void;
	className?: string;
	ref?: Ref<HTMLElement>;
}

const Tabs = ({
	activeTab,
	children,
	onChange,
	className,
	ref
}: TabsProps) => (
	<nav
		ref={ref}
		className={CssUtils.mergeClasses(
			"flex gap-1 overflow-x-auto scrollbar-none",
			className
		)}
		role="tablist">
		{Children.map(children, (child, index) =>
		isValidElement(child)
		? cloneElement(child, {
			isSelected: activeTab === index,
			onClick: () => onChange(index),
		} as any)
		: child
		)}
	</nav>
);

Tabs.displayName = "Tabs";

export default Tabs;
