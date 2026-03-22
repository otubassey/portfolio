"use client";

import {ElementType, ReactNode, Ref} from "react";

import { CssUtils } from "../../utils";

import { ButtonBase, ButtonBaseProps } from "../buttonBase";
import { IconName } from "../icon";
import { InputIcon, InputIconProps } from "../inputIcon";

const JUSTIFY_CLASSES = {
    around: "justify-around",
    between: "justify-between",
    center: "justify-center",
    end: "justify-end",
    start: "justify-start",
} as const;

const SIZE_CLASSES = {
	small: {container: "px-3 py-1.5 text-xs", icon: 14},
	medium: {container: "px-4 py-2 text-sm", icon: 18},
	large: {container: "px-6 py-3 text-base", icon: 22}
} as const;

const TEXT_TRANSFORM_CLASSES = {
	capitalize: "capitalize",
	lowercase: "lowercase",
	none: "normal-case",
	uppercase: "uppercase"
} as const;

const VARIANT_CLASSES = {
	contained: {
		primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:shadow-none",
		secondary: "bg-slate-600 hover:bg-slate-700 text-white shadow-md active:shadow-none",
		success: "bg-green-600 hover:bg-green-700 text-white shadow-md active:shadow-none",
		error: "bg-red-600 hover:bg-red-700 text-white shadow-md active:shadow-none",
		info: "bg-blue-600 hover:bg-blue-700 text-white shadow-md active:shadow-none",
		warning: "bg-yellow-600 hover:bg-yellow-700 text-white shadow-md active:shadow-none",
		inherit: "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
	},
	outlined: {
		primary: "border border-blue-600 text-blue-600 hover:bg-blue-50",
		secondary: "border border-slate-600 text-slate-600 hover:bg-slate-50",
		success: "border border-green-600 text-green-600 hover:bg-green-50",
		error: "border border-red-600 text-red-600 hover:bg-red-50",
		info: "border border-blue-600 text-blue-600 hover:bg-blue-50",
		warning: "border border-yellow-600 text-yellow-600 hover:bg-yellow-50",
		inherit: "border border-current text-inherit hover:bg-black/5"
	},
	text: {
		primary: "text-blue-600 hover:bg-slate-100 dark:hover:bg-gray-700",
		secondary: "text-slate-600 hover:bg-slate-100 dark:hover:bg-gray-700",
		success: "text-green-600 hover:bg-green-50 dark:hover:bg-gray-700",
		error: "text-red-600 hover:bg-red-50 dark:hover:bg-gray-700",
		info: "text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700",
		warning: "text-yellow-600 hover:bg-yellow-50 dark:hover:bg-gray-700",
		inherit: "text-inherit hover:bg-black/5"
	}
} as const;

export type ButtonProps<T extends ElementType = "button"> =
	Omit<ButtonBaseProps<T>, "children">
	& {
		children: ReactNode;
		className?: string;
		color?: "primary" | "secondary" | "success" | "error" | "info" | "warning" | "inherit";
		disabled?: boolean;
		endIcon?: IconName | ReactNode;
		endIconProps?: Partial<InputIconProps>;
		fullWidth?: boolean;
		justify?: keyof typeof JUSTIFY_CLASSES;
		loading?: boolean;
		ref?: Ref<HTMLButtonElement>;
		size?: "small" | "medium" | "large";
		startIcon?: IconName | ReactNode;
		startIconProps?: Partial<InputIconProps>;
		textTransform?: "uppercase" | "lowercase" | "capitalize" | "none";
		type?: "button" | "submit" | "reset";
		variant?: "contained" | "outlined" | "text";
	};

const Button = <T extends ElementType = "button">({
	children,
	className,
	color = "primary",
	component,
	disabled = false,
	endIcon,
	endIconProps,
	fullWidth = false,
	justify = "center",
	loading = false,
	ref,
	size = "medium",
	startIcon,
	startIconProps,
	textTransform = "uppercase",
	type = "button",
	variant = "contained",
	...props
}: ButtonProps<T>) => {
	const Renderable = (component || "button") as ElementType;
	const currentJustify = JUSTIFY_CLASSES[justify] || JUSTIFY_CLASSES.center;
	const currentSize = SIZE_CLASSES[size] || SIZE_CLASSES.medium;
	const currentVariant = VARIANT_CLASSES[variant] || VARIANT_CLASSES.contained;
	const currentVariantColor = currentVariant[color] || currentVariant.primary;
	const currentTextTransform = TEXT_TRANSFORM_CLASSES[textTransform] || TEXT_TRANSFORM_CLASSES.uppercase;
	const isDisabled = disabled || loading;

	return (
		<ButtonBase
			ref={ref}
			className={CssUtils.mergeClasses(
				"rounded-md font-semibold gap-2 uppercase tracking-wide transition-all duration-200",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
				"focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
				currentSize.container,
				currentVariantColor,
				currentTextTransform,
				fullWidth ? "w-full" : "w-auto",
				className
			)}
			component={Renderable}
			disabled={isDisabled}
			type={type}
			{...props}>

			<span
				className={CssUtils.mergeClasses(
					"inline-flex items-center w-full h-full pointer-events-none",
					currentJustify,
					(loading || startIcon || endIcon) && "gap-2"
				)}>

				<InputIcon
					className={CssUtils.mergeClasses(
						"pointer-events-none",
						(loading || startIcon) && "mr-2"
					)}
					icon={loading ? "spinner" : startIcon}
					size={currentSize.icon}
					{...startIconProps}
				/>

				<span
					className={CssUtils.mergeClasses(
						"truncate",
						justify === "between" && "flex-1 text-center"
					)}>
					{children}
				</span>

				<InputIcon
					className={CssUtils.mergeClasses(
						"pointer-events-none",
						endIcon && "ml-2"
					)}
					icon={endIcon}
					size={currentSize.icon}
					{...endIconProps}
				/>

				{/* "Invisible" Spacer for justify-between balance:
				    If we have a start icon but NO end icon in 'between' mode,
				    we add a hidden spacer so the text remains perfectly centered. */}
				{justify === "between" && (loading || startIcon) && !endIcon && (
					<div className="shrink-0" style={{ width: currentSize.icon }} aria-hidden="true" />
				)}

				{/* Vice-versa: Spacer for start side if only end icon exists */}
				{justify === "between" && endIcon && !(loading || startIcon) && (
					<div className="shrink-0" style={{ width: currentSize.icon }} aria-hidden="true" />
				)}

			</span>

		</ButtonBase>
	);
};

Button.displayName = "Button";

export default Button;
