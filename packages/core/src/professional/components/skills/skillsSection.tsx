"use client";

import { Ref, useState } from "react";

import { Section, SectionHandle, Select } from "@otuekong-portfolio/design-system";

import { SKILL_GROUPS } from "../../data";

import SkillsGrid from "./skillsGrid";
import SkillsProficiency from "./skillsProficiency";

const INITIAL_VARIANT = "grid";

const SKILLS_VIEWS = [
	{
		label: "View: Grid",
		value: "grid"
	},
	{
		label: "View: Proficiency",
		value: "proficiency"
	}
] as const;

type SkillsSectionVariant = typeof SKILLS_VIEWS[number]["value"];

export interface SkillsSectionProps {
	className?: string;
	id?: string;
	ref?: Ref<SectionHandle>;
}

function SkillsSection({
	className = "",
	id,
	ref
}: SkillsSectionProps) {
	const [currentVariant, setCurrentVariant] = useState<SkillsSectionVariant>(INITIAL_VARIANT);

	return (
		<Section
			ref={ref}
			className={className}
			heading="Technical Skills"
			headingProps={{
				className: "sm:text-left lg:text-center"
			}}
			id={id}
			subtitle="Technologies and tools I work with to build exceptional software."
			subtitleProps={{
				className: "sm:text-left lg:text-center"
			}}>

			<div className="flex justify-end">
				<Select
					dropdownProps={{
						buttonProps: {
							className: "min-w-[180px]"
						}
					}}
					onChange={(value) => setCurrentVariant(value as SkillsSectionVariant)}
					options={SKILLS_VIEWS}
					value={currentVariant}
				/>
			</div>

			{currentVariant === "grid" && <SkillsGrid groupedSkills={SKILL_GROUPS} />}
			{currentVariant === "proficiency" && <SkillsProficiency groupedSkills={SKILL_GROUPS} />}
		</Section>
	);
}

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
