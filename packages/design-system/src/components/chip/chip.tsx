"use client";

import { HTMLAttributes, isValidElement, MouseEvent, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

import { Icon, IconName, IconProps } from "../icon";

type ChipColor = "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning";

/**
 * Mapping theme colors to specific Tailwind utility classes.
 * We write these out fully to ensure the Tailwind compiler doesn"t purge them.
 */
const themeStyles: Record<ChipColor, { filled: string; outlined: string }> = {
	default: {
		filled: "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700",
		outlined: "bg-transparent text-gray-600 border-gray-400 dark:text-gray-300 dark:border-gray-500"
	},
	primary: {
		filled: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
		outlined: "bg-transparent text-blue-600 border-blue-500 dark:text-blue-300 dark:border-blue-500"
	},
	secondary: {
		filled: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
		outlined: "bg-transparent text-purple-600 border-purple-500 dark:text-purple-300 dark:border-purple-500"
	},
	success: {
		filled: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
		outlined: "bg-transparent text-emerald-600 border-emerald-500 dark:text-emerald-300 dark:border-emerald-500"
	},
	warning: {
		filled: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
		outlined: "bg-transparent text-amber-600 border-amber-500 dark:text-amber-300 dark:border-amber-500"
	},
	error: {
		filled: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800",
		outlined: "bg-transparent text-red-600 border-red-500 dark:text-red-300 dark:border-red-500"
	},
	info: {
		filled: "bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800",
		outlined: "bg-transparent text-sky-600 border-sky-500 dark:text-sky-300 dark:border-sky-500"
	}
};

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
	label: ReactNode;
	className?: string;
	color?: ChipColor | string;
	icon?: IconName;
	iconProps?: Partial<IconProps>;
	onClick?: (event: MouseEvent<HTMLSpanElement>) => void;
	ref?: Ref<HTMLSpanElement>;
	role?: string;
	size?: "small" | "medium";
	variant?: "filled" | "outlined";
}

const Chip = ({
	label,
	className = "",
	color = "default",
	icon,
	iconProps,
	onClick,
	ref,
	role,
	size = "small",
	variant = "filled",
	...props
}: ChipProps) => {
	const isThemeColor = color in themeStyles;

	const computedRole = role || (typeof onClick === "function" ? "button" : undefined);

	const customStyles = !isThemeColor ? {
		backgroundColor: variant === "filled" ? `${color}33` : "transparent",
		color: color,
		borderColor: color,
	} : {};

	return (
		<span
			{...props}
			ref={ref}
			className={CssUtils.mergeClasses(
				"inline-flex max-w-fit items-center gap-1.5 flex-shrink-0 rounded-full font-bold border transition-all duration-200",
				computedRole === "button" && "cursor-pointer hover:opacity-80 active:scale-95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
				isThemeColor && themeStyles[color as ChipColor][variant],
				size === "small" ? "px-2 py-0.5 text-xs" : "px-3 py-1",
				typeof onClick === "function" && "cursor-pointer hover:opacity-80 active:scale-95",
				className
			)}
			onClick={onClick}
			role={computedRole}
			style={customStyles}
			tabIndex={computedRole === "button" ? 0 : undefined}>
			{icon && <Icon name={icon} size={size === "small" ? 12 : 16} {...iconProps} />}
			{isValidElement(label) ? label : <span className="truncate">{label}</span>}
		</span>
	);
};

Chip.displayName = "Chip";

export default Chip;
