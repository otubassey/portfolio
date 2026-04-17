"use client";

import { InputHTMLAttributes, Ref, useId } from "react";

import { CssUtils } from "../../utils";

import { Icon } from "../icon";
import { Label } from "../label";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
	checked?: boolean;
	className?: string;
	disabled?: boolean;
	error?: boolean;
	id?: string;
	label?: string;
	labelPlacement?: "start" | "end";
	ref?: Ref<HTMLInputElement>;
	size?: "small" | "medium";
}

export const Checkbox = ({
	checked = false,
	className,
	disabled = false,
	error = false,
	id,
	label,
	labelPlacement = "end",
	ref,
	size = "medium",
	...props
}: CheckboxProps) => {
	const generatedId = useId();
	const checkboxId = id || generatedId;

	return (
		<div className={CssUtils.mergeClasses("flex items-center gap-3", className)}>

			{label && labelPlacement === "start" && (
			<Label htmlFor={checkboxId} className="cursor-pointer">
				{label}
			</Label>
			)}

			<div className="relative flex items-center">
				{/* Hidden Native Input */}
				<input
					ref={ref}
					id={checkboxId}
					checked={checked}
					className="peer sr-only"
					disabled={disabled}
					type="checkbox"
					{...props}
				/>

				{/* Custom Box */}
				<div className={CssUtils.mergeClasses(
					"flex items-center justify-center rounded border transition-all duration-200",
					size === "small" ? "h-4 w-4" : "h-5 w-5",
					// Normal State
					"border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800",
					// Checked State
					"peer-checked:bg-blue-600 peer-checked:border-blue-600",
					// Focus State
					"peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/50 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-gray-900",
					// Error State
					error && "border-red-500 dark:border-red-500",
					// Disabled State
					"peer-disabled:opacity-50 peer-disabled:cursor-not-allowed"
				)}>
					<Icon
						name="check"
						size={size === "small" ? 12 : 14}
						className="text-white scale-0 transition-transform duration-200 peer-checked:scale-100"
					/>
				</div>
			</div>

			{label && labelPlacement === "end" && (
			<Label htmlFor={checkboxId} className="cursor-pointer">
				{label}
			</Label>
			)}
		</div>
	);
};

Checkbox.displayName = "Checkbox";

export default Checkbox;
