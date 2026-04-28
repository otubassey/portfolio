"use client";

import { JSX } from "react";

import { Chip } from "@otuekong-portfolio/curio";

import ExhibitLabelValue from "./exhibitLabelValue";
import UnknownExhibitLabel from "./unknownExhibitLabel";

export interface ExhibitLabelProps {
	family: string | null | undefined;
	value: string | null | undefined;
	className?: string;
}

function ExhibitLabel({
	family,
	value,
	className = ""
}: ExhibitLabelProps): JSX.Element {
	if(!family && !value) {
		return (
			<UnknownExhibitLabel
				className={className}
				family={family}
				value={value}
			/>
		);
	}
	return (
		<Chip
			className={className}
			color="default"
			label={
				<ExhibitLabelValue
					family={family}
					value={value}
				/>
			}
			size="medium"
			variant="filled"
		/>
	);
};

export default ExhibitLabel;
