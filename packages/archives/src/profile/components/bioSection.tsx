"use client";

import { ReactNode } from "react";

import { CssUtils, Section, Text, TextProps } from "@otuekong-portfolio/curio";

import { PERSONA_INFO } from "../data";

export interface BioSectionProps {
	children?: ReactNode;
	className?: string;
	id?: string;
	textProps?: Partial<TextProps>;
}

function BioSection({
	children,
	className = "",
	id,
	textProps
}: BioSectionProps) {
  	const content = children || <Text {...textProps}>{PERSONA_INFO.bio}</Text>;
	return (
		<Section
			className={CssUtils.mergeClasses("flex flex-col gap-6", className)}
			heading={PERSONA_INFO.role}
			id={id}>
			{content}
		</Section>
	);
}

BioSection.displayName = "BioSection";

export default BioSection;
