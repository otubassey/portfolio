"use client";

import { ChangeEvent, forwardRef, TextareaHTMLAttributes, useId } from "react";

import { CssUtils } from "../../utils";

import { Label } from "../label";
import { Typography } from "../typography";

const COLOR_CLASSES = {
	primary: "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
	secondary: "border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent"
} as const;

const SIZE_CLASSES = {
	small: "px-3 py-2 text-sm",
	medium: "px-4 py-3 text-base"
} as const;

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	color?: "primary" | "secondary";
	error?: boolean | string;
	fullWidth?: boolean;
	label?: string;
	maxRows?: number;
	minRows?: number;
	onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
	size?: "small" | "medium";
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
	className,
	color: colorProp,
	disabled = false,
	error,
	fullWidth,
	id: idProp,
	label,
	maxRows: maxRowsProp,
	minRows: minRowsProp,
	onChange,
	required = false,
	size: sizeProp,
	...props
}: TextAreaProps, ref) => {
	const generatedId = useId();
	const color = colorProp || "primary";
	const componentId = idProp || generatedId;
	const errorId = `${componentId}-error`;
    const isError = Boolean(error);
	const minRows = Math.max(1, minRowsProp ?? 3);
	const maxRows = Math.max(minRows, maxRowsProp ?? 10);
	const size = sizeProp || "medium";

    return (
		<div className={CssUtils.mergeClasses(
			"flex flex-col",
			fullWidth ? "w-full" : "w-auto",
			className)}>

			{label && (
			<Label
				color={isError ? "error" : color}
				htmlFor={componentId}
				required={required}>
				{label}
			</Label>
			)}

			<textarea
				ref={ref}
				aria-describedby={isError ? errorId : undefined}
				aria-errormessage={isError ? errorId : undefined}
				aria-invalid={(isError ? "true" : "false") as "true" | "false"}
				aria-required={(required ? "true" : "false") as "true" | "false"}
				className={CssUtils.mergeClasses(
					"w-full rounded-lg border outline-none transition-all resize-none",
					"bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white",
					// Native Auto-resize logic via CSS
					"field-sizing-content",
					COLOR_CLASSES[color],
					SIZE_CLASSES[size],
					disabled && "disabled:opacity-50 disabled:bg-gray-100 dark:disabled:bg-gray-800",
					fullWidth ? "w-full" : "w-auto",
					isError && "border-red-500 focus:ring-2 focus:ring-red-500/20"
				)}
				disabled={disabled}
				id={componentId}
				onChange={onChange}
				style={{
					// Using "lh" unit for precise row-based clamping
					minHeight: `${minRows}lh`,
					maxHeight: `${maxRows}lh`,
					fieldSizing: "content" // Supporting modern browsers
				} as React.CSSProperties}
				{...props}
			/>

			{isError && (
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
});

TextArea.displayName = "TextArea";

export default TextArea;
