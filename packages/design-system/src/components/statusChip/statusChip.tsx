"use client";

import { Ref } from "react";

import { Chip, ChipProps } from "../chip";

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

export interface StatusChipProps<T extends string> extends Omit<ChipProps, "color" | "label"> {
	status: T;
	statusMapping: Record<T, { color: ChipProps["color"]; label: string }>;
	ref?: Ref<HTMLDivElement>;
	srOnlyPrefix?: string;
}

const StatusChip = <T extends string>({
	status,
	statusMapping,
	ref,
	srOnlyPrefix,
	...props
}: StatusChipProps<T>) => {
	const config = statusMapping?.[status];
	if(!config) {
		return (
			<Chip
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
		<Chip
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

StatusChip.displayName = "StatusChip";

export default StatusChip;
