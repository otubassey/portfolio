"use client";

import { useId } from "react";

import {
	ContactSection,
	ExperienceSection,
	ProjectsSection,
	SkillsSection
} from "@otuekong-portfolio/archives";
import { Alert } from "@otuekong-portfolio/curio";
import {
	Breadcrumb,
	HelloworldPortfolioSubViewName,
} from "@otuekong-portfolio/features";

import { InteractiveHeroSection } from ".";

import composeSectionId from "./composeSectionId";

const SectionClassname = {
	DESKTOP: "lg:flex flex-col gap-8 p-8 min-h-screen",
	MOBILE: "flex flex-col gap-8",
	MOBILE_CONTAINER: "flex flex-col gap-8 p-8"
} as const;

export interface PortfolioViewItemsProps {
	lastActiveBreadcrumb: Breadcrumb | undefined;
}

const PortfolioViewItems = ({
	lastActiveBreadcrumb
}: PortfolioViewItemsProps) => {
	const componentId = useId();

	return (
		<>
			{!lastActiveBreadcrumb && (
			<Alert
				message="Select a view to be displayed"
				severity="info"
			/>
			)}

			{lastActiveBreadcrumb?.name === HelloworldPortfolioSubViewName.HOME && (
			<InteractiveHeroSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(HelloworldPortfolioSubViewName.HOME, componentId, "desktop")}
			/>
			)}

			{lastActiveBreadcrumb?.name === HelloworldPortfolioSubViewName.PROJECTS && (
			<ProjectsSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(HelloworldPortfolioSubViewName.PROJECTS, componentId, "desktop")}
			/>
			)}

			{lastActiveBreadcrumb?.name === HelloworldPortfolioSubViewName.EXPERIENCE && (
			<ExperienceSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(HelloworldPortfolioSubViewName.EXPERIENCE, componentId, "desktop")}
			/>
			)}

			{lastActiveBreadcrumb?.name === HelloworldPortfolioSubViewName.SKILLS && (
			<SkillsSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(HelloworldPortfolioSubViewName.SKILLS, componentId, "desktop")}
			/>
			)}

			{lastActiveBreadcrumb?.name === HelloworldPortfolioSubViewName.CONTACT && (
			<ContactSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(HelloworldPortfolioSubViewName.CONTACT, componentId, "desktop")}
			/>
			)}

		</>
	);
};

export default PortfolioViewItems;
