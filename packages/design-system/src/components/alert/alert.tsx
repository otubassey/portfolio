"use client";

import { ReactNode, Ref, useId } from "react";

import { useToggle } from "@otuekong-portfolio/common";

import { CssUtils } from "../../utils";

import { Collapse } from "../collapse";
import { CopyButton } from "../copyButton";
import { Icon } from "../icon";
import { ToggleIconButton } from "../toggleIconButton";
import { Typography, TypographyProps } from "../typography";

const ICON_NAME_BY_SEVERITY = {
	success: "check-circle",
	info: "info",
	warning: "alert-warning",
	error: "alert-circle"
} as const;

const VARIANT_STYLES = {
	filled: {
		error: "bg-red-600 text-white",
		info: "bg-blue-600 text-white",
		success: "bg-green-600 text-white",
		warning: "bg-yellow-600 text-white"
	},
	outlined: {
		error: "border border-red-500 text-red-700 bg-transparent",
		info: "border border-blue-500 text-blue-700 bg-transparent",
		success: "border border-green-500 text-green-700 bg-transparent",
		warning: "border border-yellow-500 text-yellow-700 bg-transparent"
	},
	standard: {
		error: "bg-red-50 text-red-800",
		info: "bg-blue-50 text-blue-800",
		success: "bg-green-50 text-green-800",
		warning: "bg-yellow-50 text-yellow-800"
	}
} as const;

type Severity = "error" | "info" | "success" | "warning";

type Variant = "filled" | "outlined" | "standard";

export interface AlertProps {
	message: string;
	copyText?: string;
	detail?: ReactNode;
	ref?: Ref<HTMLDivElement>;
	severity?: Severity;
  	variant?: Variant;
}

const Alert = ({
	message,
	copyText,
	detail,
	ref,
	severity: severityProp,
	variant: variantProp
}: AlertProps) => {
	const [isOpen, toggleIsOpen] = useToggle(false);

	const generatedId = useId();
	const detailId = `alert-detail-${generatedId}`;

	const severity = severityProp || "error";
	const variant = variantProp || "standard";

	const isOutlined = variant === "outlined";
	const isFilled = variant === "filled";

	// Only apply Typography color if NOT in "filled" variant to avoid low contrast
	const textOverride = isFilled ? "inherit" : (severity as TypographyProps["color"]);

	return (
		<div
			ref={ref}
			className={CssUtils.mergeClasses(
				"w-full overflow-hidden rounded-lg shadow-sm",
				isOutlined && VARIANT_STYLES.outlined[severity]
			)}
			role="alert">
			<div
				className={CssUtils.mergeClasses(
					"flex items-center justify-between px-4 py-3 gap-3 w-full",
					(isFilled && isOpen && detail) ? "rounded-t-lg" : "rounded-lg",
					isOutlined ? "bg-transparent" : VARIANT_STYLES[variant][severity]
				)}>

				<div className="flex items-center gap-3 min-w-0">
					<Icon
						className="shrink-0"
						name={ICON_NAME_BY_SEVERITY[severity]}
						size={20}
					/>

					<Typography
						color={textOverride}
						truncate
						variant="h6">
						{message}
					</Typography>
				</div>

				{detail && (
				<div className="shrink-0">
					<ToggleIconButton
						aria-controls={detailId}
						aria-expanded={isOpen}
						aria-label={isOpen ? "Collapse details" : "Expand details"}
						checked={isOpen}
						checkedIcon="chevron-up"
						color={isFilled ? "inherit" : severity}
						icon="chevron-down"
						onToggle={toggleIsOpen}
					/>
				</div>
				)}
			</div>

			{isOpen && (
			<Collapse
				className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
				id={detailId}
				expand>

				<div className="flex flex-col gap-4 p-4">

					<div className="flex justify-end">
						{copyText && (
						<CopyButton
							color={isFilled
								? "inherit"
								: (severity === "error" ? "error" : "primary")
							}
							value={copyText}
						/>
						)}
					</div>

					<div
						className={CssUtils.mergeClasses(
							"font-mono text-[11px] md:text-xs text-gray-700 dark:text-gray-300",
							"whitespace-pre-wrap scrollbar-thin overflow-y-auto",
							"h-48"
						)}>
						{detail}
					</div>

				</div>

			</Collapse>
			)}

		</div>
	);
};

Alert.displayName = "Alert";

export default Alert;
