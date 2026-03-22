"use client";

import { MouseEventHandler, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

import { ButtonBase, ButtonBaseProps } from "../buttonBase";

export interface LinkButtonProps extends Omit<ButtonBaseProps<"button">, "component"> {
	children: ReactNode;
	onClick: MouseEventHandler<HTMLButtonElement>;
	className?: string;
	color?: "primary" | "inherit";
	disabled?: boolean;
	ref?: Ref<HTMLButtonElement>;
	underline?: "none" | "hover" | "always";
}

const LinkButton = ({
	children,
	className,
	color = "primary",
	disabled = false,
	onClick,
	ref,
	underline = "hover",
	...props
}: LinkButtonProps) => {
	return (
		<ButtonBase
			ref={ref}
			className={CssUtils.mergeClasses(
				"transition-colors duration-200 font-inherit",
				color === "primary"
					? "text-blue-600 hover:text-blue-500 active:text-blue-700"
					: "text-inherit hover:opacity-80",
				underline === "none" && "no-underline",
				underline === "hover" && "no-underline hover:underline",
				underline === "always" && "underline",
				className
			)}
			component="button"
			disabled={disabled}
			onClick={onClick}
			type="button"
			{...props}>
			{children}
		</ButtonBase>
	);
};

LinkButton.displayName = "LinkButton";

export default LinkButton;
