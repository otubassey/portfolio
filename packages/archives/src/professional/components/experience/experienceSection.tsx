"use client";

import { Ref } from "react";

import { Section, SectionHandle } from "@otuekong-portfolio/curio";

import {EXPERIENCES} from "../../data";

import ExperienceCard from "./experienceCard";

export interface ExperienceSectionProps {
	className?: string;
	id?: string;
	ref?: Ref<SectionHandle>;
}

function ExperienceSection({
	className = "",
	id,
	ref
}: ExperienceSectionProps) {
	return (
		<Section
			ref={ref}
			className={className}
			heading="Professional Experience"
			headingProps={{
				className: "sm:text-left lg:text-center"
			}}
			id={id}
			subtitle="A timeline of my professional journey, focused on solving complex problems and delivering scalable solutions."
			subtitleProps={{
				className: "sm:text-left lg:text-center"
			}}>

			<div className="flex flex-col gap-8">
				{EXPERIENCES.map((experience, index) => (
				<ExperienceCard key={index} {...experience} />
				))}
			</div>

		</Section>
	);
}

ExperienceSection.displayName = "ExperienceSection";

export default ExperienceSection
