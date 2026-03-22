"use client";

import { ReactNode } from "react";

import { CssUtils, Section, Text, TextProps } from "@otuekong-portfolio/design-system";

export interface BioSectionProps {
	bioText?: string;
	children?: ReactNode;
	className?: string;
	headingText?: string;
	textProps?: Partial<TextProps>;
}

function BioSection({
	bioText,
	children,
	className = "",
	headingText,
	textProps
}: BioSectionProps) {
  	const content = children || <Text {...textProps}>{bioText || "No bio available"}</Text>;
	return (
		<Section
			className={CssUtils.mergeClasses("flex flex-col gap-6", className)}
			heading={headingText || "About Me"}>
			{content}
		</Section>
	);
}

BioSection.displayName = "BioSection";

export default BioSection;
