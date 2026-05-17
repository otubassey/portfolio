"use client";

import { ReactNode, Ref, useEffect, useId } from "react";

import { useTimer, useToggle } from "../../hooks";
import { CssUtils } from "../../utils";

import { Collapse } from "../collapse";
import { CopyButton } from "../copyButton";
import { Icon } from "../icon";
import { ToggleIconButton } from "../toggleIconButton";
import { Typography, TypographyProps } from "../typography";
import { IconButton } from "../iconButton";
import { LinearProgress } from "../linearProgress";

type Severity = "error" | "info" | "success" | "warning";

type Variant = "filled" | "outlined" | "standard";

const getProgressColor = (
	isFilled: boolean,
	isOutlined: boolean,
	severity: Severity
) => {
	if(isFilled) {
		return "var(--color-portfolio-default-text-contrast)";
	}

	if(isOutlined) {
		const colorMap: Record<Severity, string> = {
			error: "var(--color-portfolio-error)",
			info: "var(--color-portfolio-primary)",
			success: "var(--color-portfolio-success)",
			warning: "var(--color-portfolio-warning)"
		};
		return colorMap[severity];
	}

	const colorMap: Record<Severity, string> = {
		error: "var(--color-portfolio-error-dark)",
		info: "var(--color-portfolio-primary-dark)",
		success: "var(--color-portfolio-success-dark)",
		warning: "var(--color-portfolio-warning-dark)"
	};

	return colorMap[severity];
};

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

export interface AlertProps {
	message: string;
	autoHideDuration?: number;  // milliseconds
	className?: string;
	continueOnHover?: boolean;
	copyText?: string;
	detail?: ReactNode;
	detailProps?: Omit<TypographyProps, "children">;
	messageProps?: Omit<TypographyProps, "children">;
	onClose?: () => void;
	ref?: Ref<HTMLDivElement>;
	severity?: Severity;
	transactionId?: string;
  	variant?: Variant;
}

const Alert = ({
	message,
	autoHideDuration,
	continueOnHover = false,
	copyText,
	detail,
	detailProps,
	messageProps,
	onClose,
	ref,
	severity: severityProp,
	transactionId,
	variant: variantProp
}: AlertProps) => {
	const [isDetailPanelExpanded, toggleIsDetailPanelExpanded] = useToggle(false);
	const [isAlertVisible, toggleIsAlertVisible] = useToggle(true);

	const generatedId = useId();
	const detailId = `alert-detail-${generatedId}`;

	const { clear, inProgress, pause, progress, resume, start } = useTimer({
		direction: "drain",
		onEnd: () => {
			toggleIsAlertVisible(false);
			onClose?.();
		}
	});

	const severity = severityProp || "error";
	const variant = variantProp || "standard";

	const isOutlined = variant === "outlined";
	const isFilled = variant === "filled";

	// Only apply Typography color if NOT in "filled" variant to avoid low contrast
	const textOverride = isFilled ? "inherit" : (severity as TypographyProps["color"]);

	const { color: detailColor, truncate: detailTruncate, variant: detailVariant, ...detailTypographyProps} = detailProps ?? {};
	const { color: messageColor, truncate: messageTruncate, variant: messageVariant, ...messageTypographyProps} = messageProps ?? {};

	const handleMouseEnter = () => {
		if(!continueOnHover && inProgress) {
			pause();
		}
	};

	const handleMouseLeave = () => {
		if(!isDetailPanelExpanded && !inProgress) {
			resume();
		}
	};

	useEffect(() => {
		if(autoHideDuration) {
			start(autoHideDuration);
		}
		return () => clear();
	}, [autoHideDuration, clear, start]);

	useEffect(() => {
		if(isDetailPanelExpanded && inProgress) {
			pause();
		}
	}, [isDetailPanelExpanded, pause]);

	if(!isAlertVisible) {
		return null;
	}

	return (
		<div
			ref={ref}
			className={CssUtils.mergeClasses(
				"w-full overflow-hidden rounded-lg shadow-sm",
				isOutlined && VARIANT_STYLES.outlined[severity]
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			role="alert">

			{Boolean(autoHideDuration) && (
			<LinearProgress
				color={getProgressColor(isFilled, isOutlined, severity)}
				variant="determinate"
				value={progress}
			/>
			)}

			<div
				className={CssUtils.mergeClasses(
					"flex items-center justify-between px-4 py-3 gap-3 w-full",
					(isFilled && isDetailPanelExpanded && detail) ? "rounded-t-lg" : "rounded-lg",
					Boolean(autoHideDuration) && "rounded-t-none",
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
						variant="h6"
						{...messageTypographyProps}>
						{message}
					</Typography>

					{!isDetailPanelExpanded && transactionId && !detail && (
					<Typography variant="caption" className="opacity-60 font-mono text-[10px]">
						REF ID: {transactionId.slice(0, 8)}
					</Typography>
					)}
				</div>

				<div className="flex items-center gap-2 shrink-0">

					{detail && (
					<ToggleIconButton
						aria-controls={detailId}
						aria-expanded={isDetailPanelExpanded}
						aria-label={isDetailPanelExpanded ? "Collapse details" : "Expand details"}
						checked={isDetailPanelExpanded}
						checkedIcon="chevron-up"
						color={isFilled ? "inherit" : severity}
						icon="chevron-down"
						onToggle={toggleIsDetailPanelExpanded}
					/>
					)}

					{onClose && (
					<IconButton
						aria-label="Close alert"
						color={isFilled ? "inherit" : severity}
						icon="x"
						onClick={onClose}
						size="small"
					/>
					)}

				</div>

			</div>

			{isDetailPanelExpanded && (
			<Collapse
				className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
				id={detailId}
				expand>

				<div className={CssUtils.mergeClasses(
					"flex flex-col p-4",
					(Boolean(copyText) || Boolean(transactionId)) && "gap-4"
				)}>

					{(Boolean(copyText) || Boolean(transactionId)) && (
					<div
						className={CssUtils.mergeClasses(
							"flex items-center",
							Boolean(transactionId && copyText) && "justify-between",
							Boolean(copyText && !transactionId) && "justify-end"
						)}>

						{transactionId && (
						<span className="flex gap-1">
							<Typography
								className="whitespace-pre-wrap"
								color="primary"
								variant="caption"
								weight="bold">
								REF ID:
							</Typography>
							<Typography
								className="whitespace-pre-wrap"
								color="muted"
								variant="overline"
								weight="medium">
								{transactionId}
							</Typography>
						</span>
						)}

						{copyText && (
						<CopyButton
							color={isFilled
								? "inherit"
								: (severity === "error" ? "error" : "primary")
							}
							value={`Reference ID: ${transactionId}\nDetails: ${detail ?? "No additional details provided."}`}
						/>
						)}

					</div>
					)}

					<div
						className={CssUtils.mergeClasses(
							"scrollbar-thin overflow-y-auto",
							"max-h-48"
						)}>
						<Typography
							className="whitespace-pre-wrap"
							color={textOverride}
							variant="body1"
							{...detailTypographyProps}>
							{detail}
						</Typography>
					</div>

				</div>

			</Collapse>
			)}

		</div>
	);
};

Alert.displayName = "Alert";

export default Alert;
