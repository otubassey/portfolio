"use client";

import { JSX } from "react";

import { Chip } from "@otuekong-portfolio/curio";

export interface UnknownExhibitLabelProps {
	className?: string;
	family?: string | null | undefined;
	value?: string | null | undefined;
}

function UnknownExhibitLabel({
	family,
	value,
	className = ""
}: UnknownExhibitLabelProps): JSX.Element {
	return (
		<Chip
			className={className}
			color="error"
			icon="alert-circle"
			label={`Unknown application from family: '${family}' and label: '${value}'`}
			size="medium"
			variant="filled"
		/>
	);
};

export default UnknownExhibitLabel;
