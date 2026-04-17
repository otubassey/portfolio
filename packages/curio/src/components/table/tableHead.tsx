"use client";

import { ReactNode, Ref, TableHTMLAttributes } from "react";

import { CssUtils } from "../../utils";

export interface TableHeadProps extends TableHTMLAttributes<HTMLTableSectionElement> {
	children: ReactNode;
	className?: string;
	ref?: Ref<HTMLTableSectionElement>;
}

const TableHead = ({
	children,
	className,
	ref,
	...props
}: TableHeadProps) => (
	<thead
		ref={ref}
		className={CssUtils.mergeClasses(
			"bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700",
			className)
		}
		{...props}>
		{children}
	</thead>
);

TableHead.displayName = "TableHead";

export default TableHead;
