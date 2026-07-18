"use client";

import { useId } from "react";

import { ContactSection, ExperienceSection, ProjectsSection, SkillsSection } from "@otuekong-portfolio/archives/ui";
import { Alert } from "@otuekong-portfolio/curio";

import { Breadcrumb } from "../../../../../core/internalIndex";

import { PortfolioSubViewName } from "../portfolio.constants";

import composeSectionId from "./composeSectionId";
import { InteractiveHeroSection } from "./interactiveHero";

const SectionClassname = Object.freeze({
	DESKTOP: "lg:flex flex-col gap-8 p-8 min-h-screen",
	MOBILE: "flex flex-col gap-8",
	MOBILE_CONTAINER: "flex flex-col gap-8 p-8"
} as const);

export interface PortfolioViewItemsProps {
	clientId: string;
	lastActiveBreadcrumb: Breadcrumb | undefined;
	targetAppId: string;
}

const PortfolioViewItems = ({
	clientId,
	lastActiveBreadcrumb,
	targetAppId
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

			{lastActiveBreadcrumb?.name === PortfolioSubViewName.HOME && (
			<InteractiveHeroSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(PortfolioSubViewName.HOME, componentId, "desktop")}
			/>
			)}

			{lastActiveBreadcrumb?.name === PortfolioSubViewName.PROJECTS && (
			<ProjectsSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(PortfolioSubViewName.PROJECTS, componentId, "desktop")}
			/>
			)}

			{lastActiveBreadcrumb?.name === PortfolioSubViewName.EXPERIENCE && (
			<ExperienceSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(PortfolioSubViewName.EXPERIENCE, componentId, "desktop")}
			/>
			)}

			{lastActiveBreadcrumb?.name === PortfolioSubViewName.SKILLS && (
			<SkillsSection
				className={SectionClassname.DESKTOP}
				id={composeSectionId(PortfolioSubViewName.SKILLS, componentId, "desktop")}
			/>
			)}

			{lastActiveBreadcrumb?.name === PortfolioSubViewName.CONTACT && (
			<ContactSection
				className={SectionClassname.DESKTOP}
				clientId={clientId}
				id={composeSectionId(PortfolioSubViewName.CONTACT, componentId, "desktop")}
				targetAppId={targetAppId}
			/>
			)}

		</>
	);
};

export default PortfolioViewItems;
