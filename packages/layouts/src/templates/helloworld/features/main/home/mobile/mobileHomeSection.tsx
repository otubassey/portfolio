"use client";

import { Ref } from "react";

import { ProfileBioSection, ProfileSalutation } from "@otuekong-portfolio/core";
import { Section, SectionHandle } from "@otuekong-portfolio/design-system";

import { InteractiveHeroSection } from "../common";

interface MobileHomeSectionProps {
	className?: string;
	id?: string;
	ref?: Ref<SectionHandle>;
}

function MobileHomeSection({
	className,
	id,
	ref
}: MobileHomeSectionProps) {
	return (
		<Section
			ref={ref}
			className={className}
			id={id}>
			<ProfileSalutation orientation="vertical" />

			<ProfileBioSection className="p-0" />

			<InteractiveHeroSection className="flex flex-col gap-6" />
		</Section>
	);
}

export default MobileHomeSection;
