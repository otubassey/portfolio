"use client";

import { useId } from "react";

import {
	BioSection,
	ContactSection,
	ExperienceSection,
	ProjectsSection,
	Salutation,
	SkillsSection
} from "@otuekong-portfolio/features";

import { InteractiveHeroSection } from "../../components";
import { PortfolioPageSection, PortfolioPageSectionName } from "../../constants";
import { useAppDetails } from "../../providers"


import composeSectionId from "./composeSectionId";
import PageLayoutShell from "./pageLayoutShell";
import PortfolioViewMobileContent from "./portfolioViewMobileContent";
import SectionNavigation from "./sectionNavigation";

const SectionClassname = {
	DESKTOP: "lg:flex flex-col gap-8 p-8 min-h-screen",
	MOBILE: "flex flex-col gap-8",
	MOBILE_CONTAINER: "flex flex-col gap-8 p-8"
} as const;

export interface PortfolioViewProps {}

const PortfolioView = ({}: PortfolioViewProps) => {
	const {
		isMobileMenuOpen,
		onPageSectionSelect,
		selectedPageSection,
		toggleIsMobileMenuOpen
	} = useAppDetails();

	const componentId = useId();

	return (
		<PageLayoutShell
			mobileContent={
				<PortfolioViewMobileContent
					id={componentId}
					isMenuOpen={isMobileMenuOpen}
					selectedPageSection={selectedPageSection as PortfolioPageSectionName}
					toggleIsMenuOpen={toggleIsMobileMenuOpen}
				/>
			}
			sidebar={
				<>
					<Salutation
						className="p-8"
						id={`desktop-salutation-${componentId}`}
						orientation="vertical"
					/>

					<BioSection
						className="p-8 bg-white dark:bg-gray-800"
						id={`desktop-bio-${componentId}`}
					/>

					<SectionNavigation
						activeSection={selectedPageSection as PortfolioPageSectionName}
						id={`desktop-navigation-${componentId}`}
						onClick={onPageSectionSelect}
					/>
				</>
			}>
			{selectedPageSection === PortfolioPageSection.HOME && (
			<InteractiveHeroSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(PortfolioPageSection.HOME, componentId, "desktop")}
			/>
			)}

			{selectedPageSection === PortfolioPageSection.PROJECTS && (
			<ProjectsSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(PortfolioPageSection.PROJECTS, componentId, "desktop")}
			/>
			)}

			{selectedPageSection === PortfolioPageSection.EXPERIENCE && (
			<ExperienceSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(PortfolioPageSection.EXPERIENCE, componentId, "desktop")}
			/>
			)}

			{selectedPageSection === PortfolioPageSection.SKILLS && (
			<SkillsSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(PortfolioPageSection.SKILLS, componentId, "desktop")}
			/>
			)}

			{selectedPageSection === PortfolioPageSection.CONTACT && (
			<ContactSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(PortfolioPageSection.CONTACT, componentId, "desktop")}
			/>
			)}
		</PageLayoutShell>
	);
};

export default PortfolioView;
