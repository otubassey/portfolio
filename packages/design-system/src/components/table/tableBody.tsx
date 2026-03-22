"use client";

import { HTMLAttributes, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
	children: ReactNode;
	className?: string;
	ref?: Ref<HTMLTableSectionElement>;
}

const TableBody = ({
	children,
	className,
	ref,
	...props
}: TableBodyProps) => (
	<tbody
		ref={ref}
		className={CssUtils.mergeClasses("divide-y divide-gray-200 dark:divide-gray-700", className)}
		{...props}>
		{children}
	</tbody>
);

TableBody.displayName = "TableBody";

export default TableBody;
