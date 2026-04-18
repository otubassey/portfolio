"use client";

import { HTMLAttributes, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
	children: ReactNode;
	className?: string;
	ref?: Ref<HTMLTableRowElement>;
}

const TableRow = ({
	children,
	className,
	ref
}: TableRowProps) => (
	<tr
		ref={ref}
		className={CssUtils.mergeClasses(
			"transition-colors align-top",
			className
		)}>
		{children}
	</tr>
);

TableRow.displayName = "TableRow";

export default TableRow;
