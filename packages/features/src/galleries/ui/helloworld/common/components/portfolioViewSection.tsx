"use client";

import { useEffect, useId, useRef } from "react";

import {
	ContactSection,
	ExperienceSection,
	ProjectsSection,
	SkillsSection
} from "@otuekong-portfolio/archives";
import { Section, SectionHandle } from "@otuekong-portfolio/curio";

import { Breadcrumb } from "../../../../navigation";

import { PortfolioSubViewName } from "../portfolio.constants";

import composeSectionId from "./composeSectionId";
import MobileHomeSection from "./mobileHomeSection";

const Styles = {
	CONTAINER: "flex flex-col gap-8 p-8",
	SECTION: "flex flex-col gap-8 scroll-mt-20"
} as const;

export interface PortfolioViewSectionProps {
	lastActiveBreadcrumb: Breadcrumb | undefined;
}

const PortfolioViewSection = ({
	lastActiveBreadcrumb
}: PortfolioViewSectionProps) => {
	const componentId = useId();
	const mobileSectionRefs = useRef<Map<string, SectionHandle>>(new Map());

	const setSectionRef = (
		sectionName: typeof PortfolioSubViewName[keyof typeof PortfolioSubViewName]
	) => (sectionHandle: SectionHandle | null) => {
		if(sectionHandle) {
			mobileSectionRefs.current.set(sectionName, sectionHandle);
		} else {
			mobileSectionRefs.current.delete(sectionName);
		}
	};

	useEffect(() => {
		if(lastActiveBreadcrumb) {
			const sectionHandle = mobileSectionRefs.current.get(lastActiveBreadcrumb.name);
			sectionHandle?.scroll();
		}
	}, [lastActiveBreadcrumb]);

	return (
		<Section className={Styles.CONTAINER}>

			<MobileHomeSection
				ref={setSectionRef(PortfolioSubViewName.HOME)}
				className={Styles.SECTION}
				id={composeSectionId(PortfolioSubViewName.HOME, componentId, "mobile")}
			/>

			<ProjectsSection
				ref={setSectionRef(PortfolioSubViewName.PROJECTS)}
				className={Styles.SECTION}
				id={composeSectionId(PortfolioSubViewName.PROJECTS, componentId, "mobile")}
			/>

			<ExperienceSection
				ref={setSectionRef(PortfolioSubViewName.EXPERIENCE)}
				className={Styles.SECTION}
				id={composeSectionId(PortfolioSubViewName.EXPERIENCE, componentId, "mobile")}
			/>

			<SkillsSection
				ref={setSectionRef(PortfolioSubViewName.SKILLS)}
				className={Styles.SECTION}
				id={composeSectionId(PortfolioSubViewName.SKILLS, componentId, "mobile")}
			/>

			<ContactSection
				ref={setSectionRef(PortfolioSubViewName.CONTACT)}
				className={Styles.SECTION}
				id={composeSectionId(PortfolioSubViewName.CONTACT, componentId, "mobile")}
			/>

		</Section>
	);
};

export default PortfolioViewSection;
