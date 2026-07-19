"use client";

import { Ref } from "react";

import { BioSection, ExperienceBadge, Salutation } from "@otuekong-portfolio/archives/ui";
import { Section, SectionHandle } from "@otuekong-portfolio/curio";

import { InteractiveHeroSection } from "./interactiveHero";

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

			<BioSection className="p-0">
				<ExperienceBadge />
			</BioSection>

			<InteractiveHeroSection className="flex flex-col gap-6" />
		</Section>
	);
}

export default MobileHomeSection;
