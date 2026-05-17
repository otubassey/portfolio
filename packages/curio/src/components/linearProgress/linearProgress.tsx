import { Ref, useId } from "react";

import { CssUtils } from "../../utils";

import { Label } from "../label";

export type LinearProgressColor = "primary" | "secondary" | "inherit" | string;

export interface LinearProgressProps {
	/** Optional text to display above the progress bar */
	label?: string;
	/** Color of the progress indicator. Supports theme tokens or raw CSS colors. */
	color?: LinearProgressColor;
	/** The percentage value (0-100) for determinate mode. */
	value?: number;
	/**
	 * determinate: fills based on 'value'
	 * indeterminate: plays a continuous loading animation
	 */
	variant?: "determinate" | "indeterminate";
	className?: string;
	ref?: Ref<HTMLDivElement>;
}

const COLOR_MAP: Record<string, string> = {
	primary: "bg-blue-600",
	secondary: "bg-purple-600",
	inherit: "bg-current"
};

const LinearProgress = ({
	label,
	color = "primary",
	value = 0,
	variant = "determinate",
	className,
	ref
}: LinearProgressProps) => {
	const generatedId = useId();

	const isThemeColor = color in COLOR_MAP;
	const isIndeterminate = variant === "indeterminate";

	// Clamping the value between 0 and 100 for visual safety
	const safeValue = Math.min(Math.max(Math.round(value), 0), 100);

	const customTrackStyle = !isThemeColor ? {
		backgroundColor: CssUtils.transparentize(color, 80)
	} : {};

	const customIndicatorStyle = !isThemeColor ? {
		backgroundColor: color,
		width: isIndeterminate ? undefined : `${safeValue}%`
	} : {
		width: isIndeterminate ? undefined : `${safeValue}%`
	};

	return (
		<div ref={ref} className={CssUtils.mergeClasses("w-full flex flex-col gap-1", className)}>
			{label && (
				<Label
					className="px-0.5"
					color="muted"
					htmlFor={generatedId}
					id={`label-${generatedId}`}>
					{label}
				</Label>
			)}

			<div
				aria-label={!label ? "Loading progress" : undefined}
				aria-labelledby={label ? `label-${generatedId}` : undefined}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-valuenow={isIndeterminate ? undefined : safeValue}
				className={CssUtils.mergeClasses(
					"relative h-1 w-full overflow-hidden rounded-full",
					isThemeColor ? "bg-gray-200 dark:bg-gray-800" : "bg-black/10 dark:bg-white/10"
				)}
				id={generatedId}
				role="progressbar"
				style={customTrackStyle}>
				<div
					className={CssUtils.mergeClasses(
						"h-full transition-all duration-300 ease-out",
						isThemeColor ? COLOR_MAP[color] : "",
						isIndeterminate && "w-full origin-left animate-pulse"
					)}
					style={customIndicatorStyle}
				/>
			</div>
		</div>
	);
};

LinearProgress.displayName = "LinearProgress";

export default LinearProgress;
