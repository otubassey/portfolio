"use client";

import { FC } from "react";

import { Card, CardContent, CssUtils } from "@otuekong-portfolio/design-system";

import { TechnologyChips } from "../../../professional";

import { SkillGroup } from "../../data";

import { SkillsGridHeader } from "./skillCardHeader";

export interface SkillsGridProps {
	groupedSkills: Array<SkillGroup>;
	className?: string;
}

export const SkillsGrid: FC<SkillsGridProps> = ({
	groupedSkills,
	className = ""
}) => {
	return (
		<div className={CssUtils.mergeClasses(
			"grid grid-cols-1 md:grid-cols-2 gap-8",
			className)}>
			{groupedSkills.map((groupedSkill, index) => (
			<Card
				key={index}
				aria-labelledby={groupedSkill.category}
				className="gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl"
				component="article">
				<SkillsGridHeader groupedSkill={groupedSkill} />
				<CardContent className="flex flex-wrap gap-2">
					<TechnologyChips
						only={groupedSkill.technologies.map(item => item.name)}
						chipProps={{
							iconProps: {
								role: undefined
							},
							size: "medium"
						}}
					/>
				</CardContent>
			</Card>
			))}
		</div>
	);
};

SkillsGrid.displayName = "SkillsGrid";

export default SkillsGrid;
