"use client";

import { AriaAttributes, ElementType, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

import { Button, ButtonProps } from "../button";
import { IconName, IconProps } from "../icon";
import { InputIcon } from "../inputIcon";

interface IconButtonContentProps {
	children?: ReactNode;
	icon?: IconName | ReactNode;
	iconProps?: any;
	loading: boolean;
	size: any
};

const IconButtonContent = ({
	children,
	icon,
	iconProps,
	loading,
	size
}: IconButtonContentProps) => {
	if(loading) {
		return (
			<InputIcon
				className="m-0"
				icon="spinner"
				size={size}
				{...iconProps}
			/>
		);
	}

	if(children) {
		return children;
	}

	if(icon) {
		return (
			<InputIcon
				className="m-0"
				icon={icon}
				size={size}
				{...iconProps}
			/>
		);
	}

	return null;
};

const BUTTON_VARIANT_MAPPING = {
	ghost: "text",
	filled: "contained",
	outlined: "outlined"
} as const;

export type IconButtonProps<T extends ElementType = "button"> =
	Omit<ButtonProps<T>, "children" | "endIcon" | "startIcon" | "variant">
	& AriaAttributes
	& {
		children?: ReactNode;
		icon?: IconName | ReactNode;
		iconProps?: Partial<IconProps>;
		loading?: boolean;
		ref?: Ref<HTMLButtonElement>;
		variant?: keyof typeof BUTTON_VARIANT_MAPPING;
	};

const IconButton = ({
	"aria-label": ariaLabel,
	children,
	className,
	color,
	component,
	icon,
	iconProps: iconPropsProp,
	loading = false,
	onClick,
	ref,
	size = "small",
	variant = "ghost",
	...props
}: IconButtonProps) => {
	const Renderable = (component || Button) as ElementType;
	const {size: iconSize, ...iconProps} = iconPropsProp || {};
	return (
		<Renderable
			ref={ref}
			aria-label={ariaLabel || (typeof icon === "string" ? icon : "icon button")}
			className={CssUtils.mergeClasses(
				"rounded-full min-w-0 aspect-square p-3 flex items-center justify-center",
				className
			)}
			color={color}
			loading={!component ? loading : undefined}
			onClick={onClick}
			size={size}
			variant={BUTTON_VARIANT_MAPPING[variant] || "text"}
			{...props}>

			<IconButtonContent
				icon={icon}
				iconProps={iconProps}
				loading={loading}
				size={size}>

				{children}

			</IconButtonContent>

		</Renderable>
	);
};

IconButton.displayName = "IconButton";

export default IconButton;
