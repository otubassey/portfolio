"use client";

import { Ref } from "react";

import { Section, SectionHandle } from "@otuekong-portfolio/curio";
import { BioSection, Salutation } from "@otuekong-portfolio/features";

import { InteractiveHeroSection } from "../../components";

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
			<Salutation orientation="vertical" />

			<BioSection className="p-0" />

			<InteractiveHeroSection className="flex flex-col gap-6" />
		</Section>
	);
}

export default MobileHomeSection;
