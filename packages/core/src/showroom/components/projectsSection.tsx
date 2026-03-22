"use client";

import { Ref } from "react";

import { Section, SectionHandle } from "@otuekong-portfolio/design-system";

import { PROJECTS } from "../data";

import ProjectCard from "./projectCard";

interface ProjectsSectionProps {
	className?: string;
	id?: string;
	ref?: Ref<SectionHandle>;
}

function ProjectsSection({
	className = "",
	id,
	ref
}: ProjectsSectionProps) {
	return (
		<Section
			ref={ref}
			className={className}
			heading="Open Source Projects"
			headingProps={{
				className: "sm:text-left lg:text-center"
			}}
			id={id}
			subtitle="A collection of personal ventures and experimental builds ranging from production-ready tools to active explorations."
			subtitleProps={{
				className: "sm:text-left lg:text-center"
			}}>

			<div className="flex flex-col gap-8">
				{PROJECTS.map((project, index) => (
				<ProjectCard key={index} {...project} />
				))}
			</div>

		</Section>
	);
}

ProjectsSection.displayName = "ProjectsSection";

export default ProjectsSection;
