"use client";

import { ChangeEvent, InputHTMLAttributes, ReactNode, Ref, useId } from "react";

import { CssUtils } from "../../utils";

import { IconName } from "../icon";
import { InputIcon } from "../inputIcon";
import { Label, LabelProps } from "../label";
import { Typography } from "../typography";

const COLOR_CLASSES = {
	primary: "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
	secondary: "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent"
} as const;

const SIZE_CLASSES = {
	small: "text-sm",
	medium: "text-base"
} as const;

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	className?: string;
	color?: "primary" | "secondary";
	disabled?: boolean;
    endIcon?: IconName | ReactNode;
	error?: boolean | string;
	fullWidth?: boolean;
	id?: string;
	label?: string;
	labelProps?: LabelProps;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	ref?: Ref<HTMLInputElement>;
	required?: boolean;
	size?: "small" | "medium";
	startIcon?: IconName | ReactNode;
}

const TextField = ({
	className,
	color: colorProp,
	disabled = false,
	endIcon,
	error,
	fullWidth,
	id: idProp,
	label,
	labelProps,
	onChange,
	ref,
	required = false,
	size: sizeProp,
	startIcon,
	...props
}: TextFieldProps) => {
	const generatedId = useId();
	const color = colorProp || "primary";
	const componentId = idProp || generatedId;
	const errorId = `${componentId}-error`;
	const isError = Boolean(error);
	const size = sizeProp || "medium";

	return (
		<div className={CssUtils.mergeClasses(
			"flex flex-col gap-1.5",
			fullWidth ? "w-full" : "w-auto",
			className)}>

			{label && (
			<Label
				color={isError ? "error" : color}
				htmlFor={componentId}
				required={required}
				{...labelProps}>
				{label}
			</Label>
			)}

			<div className="relative w-full">
				{startIcon && (
				<div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
					<InputIcon
						className="align-middle text-gray-400 pointer-events-none"
						icon={startIcon}
						size={size}
					/>
				</div>
				)}

				<input
					ref={ref}
					aria-describedby={isError ? errorId : undefined}
					aria-errormessage={isError ? errorId : undefined}
					aria-invalid={isError ? "true" : "false"}
					aria-required={required ? "true" : "false"}
					id={componentId}
					className={CssUtils.mergeClasses(
						"w-full rounded-lg px-3 py-2 border-transparent outline-none transition-all bg-gray-50 dark:bg-gray-900",
						"text-gray-900 dark:text-white disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800",
						COLOR_CLASSES[color],
						SIZE_CLASSES[size],
						disabled && "disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800",
						endIcon && "pr-12",
						isError && "border border-red-500 focus:ring-2 focus:ring-red-500/20",
						fullWidth ? "w-full" : "w-auto",
						startIcon && "pl-12"
					)}
					disabled={disabled}
					onChange={onChange}
					{...props}
				/>

				{endIcon && (
					<div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
						<InputIcon
							className="align-middle text-gray-400 pointer-events-none"
							icon={endIcon}
							size={size}
						/>
					</div>
				)}
			</div>

			{isError
			&& typeof error === "string"
			&& (
			<Typography
				className="px-1"
				color="error"
				id={errorId}
				variant="caption"
				weight="medium">
				{error}
			</Typography>
			)}
		</div>
	);
};

TextField.displayName = "TextField";

export default TextField;
