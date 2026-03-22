"use client";

import { KeyboardEvent, MouseEventHandler, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

import { ButtonBase } from "../buttonBase";
import { IconName } from "../icon";
import { InputIcon } from "../inputIcon";

const COLOR_CLASSES = {
	primary: "text-blue-400 hover:text-blue-500",
	secondary: "text-slate-600 hover:bg-slate-50",
	inherit: "text-inherit hover:bg-black/5"
} as const;

const SIZE_CLASSES = {
	small: {container: "px-3 py-1.5 text-xs", icon: 14},
	medium: {container: "px-4 py-2 text-sm", icon: 18},
	large: {container: "px-6 py-3 text-base", icon: 22}
} as const;

export interface ListItemButtonProps {
	children: ReactNode;
	alignItems?: "center" | "start";
	className?: string;
	color?: keyof typeof COLOR_CLASSES;
	disabled?: boolean;
	divider?: boolean;
	endIcon?: IconName | ReactNode;
	fullWidth?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	ref?: Ref<HTMLButtonElement>;
	selected?: boolean;
	size?: "small" | "medium" | "large";
	startIcon?: IconName | ReactNode;
}

const ListItemButton = ({
	children,
	alignItems = "center",
	className = "",
	color = "inherit",
	disabled = false,
	divider = false,
	endIcon,
	fullWidth = false,
	onClick,
	ref,
	selected = false,
	size: sizeProp = "medium",
	startIcon,
	...props
}: ListItemButtonProps) => {
	const size = sizeProp && sizeProp in SIZE_CLASSES ? sizeProp : "medium";
	const iconSize = SIZE_CLASSES[size].icon;
	const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
		if (disabled) return;
		if (event.key === "Enter" || event.key === " ") {
			event.preventDefault();
			(onClick as any)?.(event);
		}
	};
	return (
		<ButtonBase
			{...props}
			ref={ref}
			aria-disabled={disabled}
			className={CssUtils.mergeClasses(
				"flex px-4 py-2 cursor-pointer transition-all duration-200 gap-2 select-none outline-none",
				"focus-visible:ring-2 focus-visible:ring-blue-500 justify-start",
				alignItems === "start" ? "items-start" : "items-center",
				COLOR_CLASSES[color],
				disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-gray-100 dark:hover:bg-gray-700",
				divider && "border-b border-gray-100 dark:border-gray-800",
				fullWidth ? "w-full" : "w-auto",
				selected && "bg-blue-100/50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
				className
			)}
			disabled={disabled}
			onClick={onClick}
			onKeyDown={handleKeyDown}
			role="button"
			tabIndex={disabled ? -1 : 0}>

			<InputIcon
				className="pointer-events-none"
				icon={startIcon}
				size={iconSize}
			/>

			<div
				className={CssUtils.mergeClasses(
					"flex-grow min-w-0 pointer-events-none",
					Boolean(startIcon) && "ml-2",
					Boolean(endIcon) && "mr-2",
					COLOR_CLASSES[color])
				}>
				{children}
			</div>

			<InputIcon
				className="pointer-events-none"
				icon={endIcon}
				size={iconSize}
			/>

		</ButtonBase>
	);
};

ListItemButton.displayName = "ListItemButton";

export default ListItemButton;
