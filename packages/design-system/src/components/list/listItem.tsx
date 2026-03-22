"use client";

import { LiHTMLAttributes, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

import { ListStyleType } from "./constants";
import { useListContext } from "./listContext";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {
	alignItems?: "start" | "center";
	button?: boolean;
	children?: ReactNode;
	className?: string;
	disabled?: boolean;
	divider?: boolean;
	ref?: Ref<HTMLLIElement>;
	selected?: boolean;
}

const ListItem = ({
    alignItems = "center",
    button = false,
    children,
    className,
    disabled = false,
    divider = false,
	ref,
    selected = false,
    ...props
}: ListItemProps) => {
	const { listStyleType } = useListContext();
    const isStretch = listStyleType === ListStyleType.STRETCH;
    return (
		<li
			ref={ref}
			className={CssUtils.mergeClasses(
				"w-full text-base",
				"relative flex justify-start items-center text-left decoration-none box-border",
				alignItems === "start" ? "items-start" : "items-center",
				button && "cursor-pointer transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-slate-800",
				disabled && "opacity-50 pointer-events-none",
				divider && "border-y border-gray-200 dark:border-slate-700",
				Boolean(listStyleType && listStyleType !== ListStyleType.NONE) && "list-item mb-4",
				isStretch && "inline-block",
				selected && "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
				className
			)}
			{...props}>
			{isStretch
				? (
					<div className="group flex items-center py-3 active w-full">
						<span
							className={CssUtils.mergeClasses(
								"transition-all duration-300 ease-out block mr-4 rounded-full",
								selected
									? "h-1 w-16 bg-slate-200"
									: "h-4 w-4 bg-slate-600 transition-all group-hover:h-1 group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"
							)}
						/>
						<span
							className={CssUtils.mergeClasses(
								"transition-all duration-300 uppercase font-bold tracking-widest",
								selected
									? "mr-8 text-lg text-slate-200"
									: "text-xs text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200 group-hover:text-lg"
							)}>
							{children}
						</span>
					</div>
				) : (
					<div className="flex items-center gap-2 w-full">
						{children}
					</div>
				)
            }
		</li>
    );
};

ListItem.displayName = "ListItem";

export default ListItem;
