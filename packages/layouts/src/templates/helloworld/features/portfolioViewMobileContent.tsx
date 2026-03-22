"use client";

import { useEffect, useRef } from "react";

import {
	ExperienceSection,
	ProfileContactSection,
	ProjectsSection,
	SkillsSection
} from "@otuekong-portfolio/core";
import { Section, SectionHandle } from "@otuekong-portfolio/design-system";

import { PortfolioPageSection, PortfolioPageSectionName } from "../constants";

import composeSectionId from "./composeSectionId";
import { MobileHomeSection } from "./main";

const Styles = {
	CONTAINER: "flex flex-col gap-8 p-8",
	SECTION: "flex flex-col gap-8 scroll-mt-20"
} as const;

export interface PortfolioViewMobileContentProps {
	id: string;
	isMenuOpen: boolean;
	toggleIsMenuOpen: (value?: unknown) => void;
	selectedPageSection?: PortfolioPageSectionName;
}

const PortfolioViewMobileContent = ({
	id,
	isMenuOpen,
	toggleIsMenuOpen,
	selectedPageSection
}: PortfolioViewMobileContentProps) => {
	const mobileSectionRefs = useRef<Map<string, SectionHandle>>(new Map());

	const setSectionRef = (sectionName: PortfolioPageSectionName) => (sectionHandle: SectionHandle | null) => {
		if(sectionHandle) {
			mobileSectionRefs.current.set(sectionName, sectionHandle);
		} else {
			mobileSectionRefs.current.delete(sectionName);
		}
	};

	useEffect(() => {
		if(selectedPageSection) {
			const sectionHandle = mobileSectionRefs.current.get(selectedPageSection);
			sectionHandle?.scroll();
		}
	}, [selectedPageSection]);

	return (
		<Section className={Styles.CONTAINER}>

			<MobileHomeSection
				ref={setSectionRef(PortfolioPageSection.HOME)}
				className={Styles.SECTION}
				id={composeSectionId(PortfolioPageSection.HOME, id, "mobile")}
			/>

			<ProjectsSection
				ref={setSectionRef(PortfolioPageSection.PROJECTS)}
				className={Styles.SECTION}
				id={composeSectionId(PortfolioPageSection.PROJECTS, id, "mobile")}
			/>

			<ExperienceSection
				ref={setSectionRef(PortfolioPageSection.EXPERIENCE)}
				className={Styles.SECTION}
				id={composeSectionId(PortfolioPageSection.EXPERIENCE, id, "mobile")}
			/>

			<SkillsSection
				ref={setSectionRef(PortfolioPageSection.SKILLS)}
				className={Styles.SECTION}
				id={composeSectionId(PortfolioPageSection.SKILLS, id, "mobile")}
			/>

			<ProfileContactSection
				ref={setSectionRef(PortfolioPageSection.CONTACT)}
				className={Styles.SECTION}
				id={composeSectionId(PortfolioPageSection.CONTACT, id, "mobile")}
			/>

		</Section>
	);
};

export default PortfolioViewMobileContent;
