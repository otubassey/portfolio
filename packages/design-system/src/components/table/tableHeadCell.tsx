"use client";

import { ReactNode, Ref, ThHTMLAttributes } from "react";

import { CssUtils } from "../../utils";

export interface TableHeadCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
	children: ReactNode;
	className?: string;
	ref?: Ref<HTMLTableCellElement>;
}

const TableHeadCell = ({
	children,
	className,
	ref
}: TableHeadCellProps) => (
	<th
		ref={ref}
		className={CssUtils.mergeClasses(
			"px-6 py-3",
			"text-sm uppercase tracking-wider leading-normal",
			"text-gray-600 dark:text-gray-400",
			className
		)}>

		{children}

	</th>
);

TableHeadCell.displayName = "TableHeadCell";

export default TableHeadCell;
