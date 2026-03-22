"use client";

import { ButtonHTMLAttributes, ComponentPropsWithRef, ElementType, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

interface ButtonBaseOwnProps<T extends ElementType> {
	autoFocus?: boolean;
	children?: ReactNode;
	className?: string;
	component?: T;
	disabled?: boolean;
	fullWidth?: boolean;
	label?: string;
	ref?: Ref<any>;
	type?: "button" | "submit" | "reset";
}

export type ButtonBaseProps<T extends ElementType> = ButtonBaseOwnProps<T>
	& Omit<ComponentPropsWithRef<T>, keyof ButtonBaseOwnProps<T>>
	& ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonBase = <T extends ElementType = "button">({
	autoFocus = false,
	children,
	className,
	component,
	disabled = false,
	fullWidth = false,
	label,
	onClick,
	ref,
	type = "button",
	...props
}: ButtonBaseProps<T>) => {
	const Renderable = (component || "button") as ElementType;
	const isButton = Renderable === "button";

	return (
		<Renderable
			ref={ref}
			aria-label={label}
			aria-disabled={disabled}
			autoFocus={autoFocus}
			className={CssUtils.mergeClasses(
				"relative m-0 p-0 border-transparent outline-none bg-transparent cursor-pointer",
				"select-none appearance-none no-underline transition-colors",
				disabled && "pointer-events-none opacity-50",
				fullWidth && "w-full",
				isButton ? "inline-block" : "inline-flex items-center justify-center",
				className
			)}
			disabled={disabled}
			onClick={onClick}
			type={Renderable === "button" ? type : undefined}
			{...props}>

			{children}

		</Renderable>
	);
};

ButtonBase.displayName = "ButtonBase";

export default ButtonBase;
