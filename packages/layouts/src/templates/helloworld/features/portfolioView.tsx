"use client";

import { useId } from "react";

import {
	ExperienceSection,
	ProfileBioSection,
	ProfileContactSection,
	ProfileSalutation,
	ProjectsSection,
	SkillsSection
} from "@otuekong-portfolio/core";

import { PageLayoutShell } from "../components";
import { PortfolioPageSection, PortfolioPageSectionName } from "../constants";
import { useAppDetails } from "../providers"

import composeSectionId from "./composeSectionId";
import { InteractiveHeroSection, SectionNavigation } from "./main";
import PortfolioViewMobileContent from "./portfolioViewMobileContent";

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
					<ProfileSalutation
						className="p-8"
						id={`desktop-salutation-${componentId}`}
						orientation="vertical"
					/>

					<ProfileBioSection
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
			<ProfileContactSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(PortfolioPageSection.CONTACT, componentId, "desktop")}
			/>
			)}
		</PageLayoutShell>
	);
};

export default PortfolioView;
