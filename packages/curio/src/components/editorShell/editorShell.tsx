"use client";

import { ReactNode, HTMLAttributes, Ref } from "react";

import { CssUtils } from "../../utils";

export interface EditorShellProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	children: ReactNode;
	actions?: ReactNode;
	className?: string;
	hideDots?: boolean;
	ref?: Ref<HTMLDivElement>;
	title?: ReactNode;
	variant?: "dark" | "editor";
}

const EditorShell = ({
	children,
	actions,
	className,
	hideDots = false,
	ref,
	title,
	variant = "dark",
	...props
}: EditorShellProps) => {
    return (
		<div
			ref={ref}
			className={CssUtils.mergeClasses(
				"rounded-lg border border-gray-800 overflow-hidden transition-all",
				variant === "editor" ? "bg-[#1e1e1e]" : "bg-gray-900",
				className
			)}
			{...props}>
			<div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 select-none">
				<div className="flex items-center gap-4">
					{!hideDots && (
					<div aria-hidden="true" className="flex gap-1.5">
						<div className="w-3 h-3 rounded-full bg-red-500/80" />
						<div className="w-3 h-3 rounded-full bg-yellow-500/80" />
						<div className="w-3 h-3 rounded-full bg-green-500/80" />
					</div>
					)}
					<div className="text-gray-400 text-xs font-mono truncate">
						{title}
					</div>
				</div>
				<div className="flex items-center">{actions}</div>
			</div>

			<div className="relative overflow-x-auto">{children}</div>
		</div>
    );
};

EditorShell.displayName = "EditorShell";

export default EditorShell;
