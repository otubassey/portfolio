"use client";

import { ReactNode, Ref, TdHTMLAttributes } from "react";

import { CssUtils } from "../../utils";

export const COLOR_STYLES = {
	primary: "text-blue-600 dark:text-blue-400",
	default: "text-gray-900 dark:text-gray-100",
	muted: "text-gray-600 dark:text-gray-400"
} as const;

export interface TableBodyCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
	children: ReactNode;
	className?: string;
	color?: keyof typeof COLOR_STYLES;
	mono?: boolean;
	ref?: Ref<HTMLTableCellElement>;
}

const TableBodyCell = ({
	children,
	color = "default",
	className,
	mono = false,
	ref
}: TableBodyCellProps) => (
	<td
		ref={ref}
		className={CssUtils.mergeClasses(
			"px-6 py-4",
			"text-sm leading-relaxed",
			COLOR_STYLES[color],
			mono && "font-mono",
			className
		)}>

		{children}

	</td>
);

TableBodyCell.displayName = "TableBodyCell";

export default TableBodyCell;
