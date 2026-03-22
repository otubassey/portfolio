"use client";

import { ReactNode, Ref, useId } from "react";

import { CssUtils } from "../../utils";

import { ButtonBase } from "../buttonBase";
import { IconName } from "../icon";
import { InputIcon } from "../inputIcon";
import { Label } from "../label";

interface SwitchLabelProps {
	id: string;
	error?: boolean;
	isActive?: boolean;
	label?: ReactNode;
	required?: boolean;
}

const SwitchLabel = ({
	id,
	error = false,
	isActive = false,
	label,
	required = false
}: SwitchLabelProps) => {
	if(!label) {
		return null;
	}
	if(typeof label === "string") {
		return (
			<Label
				className={CssUtils.mergeClasses(
					"transition-opacity duration-200",
					!isActive && "opacity-50"
				)}
				color={error ? "error" : "inherit"}
				htmlFor={id}
				required={required}>
				{label}
			</Label>
		);
	}
	return (
		<span
			className={!isActive ? "opacity-50" : ""}>
			{label}
		</span>
	);
};

export type SwitchVariant = "thumb-icon" | "track-icon" | "minimal";

const LAYOUT_CLASSES = {
	horizontal: "flex-row items-center gap-3",
	vertical: "flex-col items-start gap-1.5"
} as const;

export interface SwitchProps {
	checked: boolean;
	onChange: (checked: boolean) => void;
	checkedLabel?: ReactNode;
	checkedIcon?: IconName | ReactNode;
	className?: string;
	disabled?: boolean;
	error?: boolean;
	labelPlacement?: "horizontal" | "vertical";
	ref?: Ref<HTMLButtonElement>;
	required?: boolean;
	uncheckedLabel?: ReactNode;
	uncheckedIcon?: IconName | ReactNode;
	variant?: SwitchVariant;
}

export const Switch = ({
	checked,
	onChange,
	checkedLabel,
	checkedIcon,
	className,
	disabled = false,
	error = false,
	labelPlacement = "horizontal",
	ref,
	required = false,
	uncheckedLabel,
	uncheckedIcon,
	variant = "thumb-icon"
}: SwitchProps) => {
	const id = useId();

	const handleToggle = () => {
		if(!disabled) onChange(!checked);
	};

	return (
		<div
			className={CssUtils.mergeClasses(
				"inline-flex select-none",
				LAYOUT_CLASSES[labelPlacement],
				disabled && "opacity-50 pointer-events-none",
				className
			)}>

			<SwitchLabel
				error={error}
				id={id}
				isActive={!checked} 
				label={uncheckedLabel}
				required={required}
			/>

			<ButtonBase
				ref={ref}
				aria-checked={checked}
				className={CssUtils.mergeClasses(
					"relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors outline-none",
					error && "ring-2 ring-red-500 ring-offset-2 dark:ring-offset-slate-900 bg-red-50 dark:bg-red-900/20",
					!error && checked
						? "bg-blue-600 hover:bg-blue-700"
						: "bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700"
				)}
				disabled={disabled}
				id={id}
				onClick={handleToggle}
				role="switch">

				{variant === "track-icon" && (
				<div className="absolute inset-0 flex items-center justify-between px-1.5 pointer-events-none">
					<InputIcon
						className={CssUtils.mergeClasses(
							"transition-opacity duration-200 text-white",
							checked ? "opacity-100" : "opacity-0"
						)}
						icon={checkedIcon}
						size="0.875rem"
					/>
					<InputIcon
						className={CssUtils.mergeClasses(
							"transition-opacity duration-200 text-gray-400",
							!checked ? "opacity-100" : "opacity-0"
						)}
						icon={uncheckedIcon}
						size="0.875rem"
					/>
				</div>
				)}

				{/* The Thumb */}
				<span
					className={CssUtils.mergeClasses(
						"flex items-center justify-center h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 z-10",
						checked ? "translate-x-5" : "translate-x-1"
					)}>

					{variant === "thumb-icon" && (
					<InputIcon
						className={checked ? "text-blue-600" : "text-gray-400"}
						icon={checked ? checkedIcon : uncheckedIcon}
						size="0.75rem"
					/>
					)}

				</span>

			</ButtonBase>

			{checkedLabel !== uncheckedLabel && (
			<SwitchLabel
				error={error}
				id={id}
				isActive={checked}
				label={checkedLabel}
				required={required}
			/>
			)}

		</div>
	);
};

Switch.displayName = "Switch";

export default Switch;
