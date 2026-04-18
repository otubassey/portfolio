"use client";

import { Ref, TableHTMLAttributes } from "react";

import { CssUtils } from "../../utils";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
	ref?: Ref<HTMLTableElement>;
}

const Table = ({
	className,
	children,
	ref,
	...props
}: TableProps) => (
	<div className="w-full overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
		<table
			ref={ref}
			className={CssUtils.mergeClasses("w-full text-left border-collapse", className)}
			{...props}>
			{children}
		</table>
	</div>
);

Table.displayName = "Table";

export default Table;
