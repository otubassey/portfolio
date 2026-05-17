"use client";

import { Ref } from "react";

import { Pill, PillProps } from "../pill";

const mapErrorLabel = (
	status: string | undefined,
	statusMapping: Record<string, { label: string }>) => {
	if(!status) {
		return "Missing Status Value";
	}
	if(!statusMapping) {
		return "Missing Status Mapping";
	}
	if(!statusMapping[status]) {
		return `Unmapped Status: ${status}`;
	}
	return "Invalid Status Configuration";
};

export interface StatusPillProps<T extends string> extends Omit<PillProps, "color" | "label"> {
	status: T;
	statusMapping: Record<T, { color: PillProps["color"]; label: string }>;
	ref?: Ref<HTMLDivElement>;
	srOnlyPrefix?: string;
}

const StatusPill = <T extends string>({
	status,
	statusMapping,
	ref,
	srOnlyPrefix,
	...props
}: StatusPillProps<T>) => {
	const config = statusMapping?.[status];
	if(!config) {
		return (
			<Pill
				{...props}
				ref={ref}
				color="error"
				icon="warning"
				label={mapErrorLabel(status, statusMapping)}
				variant="outlined"
			/>
		);
	}
	return (
		<Pill
			role="status"
			{...props}
			ref={ref}
			color={config.color}
			label={
				<>
					{srOnlyPrefix && <span className="sr-only">{srOnlyPrefix}</span>}
					<span className="truncate">{config.label}</span>
				</>
			}
		/>
	);
};

StatusPill.displayName = "StatusPill";

export default StatusPill;
