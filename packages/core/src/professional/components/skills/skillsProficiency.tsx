"use client";

import { FC, Fragment } from "react";

import { Card, CardContent, CssUtils, Text } from "@otuekong-portfolio/design-system";

import { SkillGroup } from "../../data";

import SkillsGridHeader from "./skillCardHeader";

export interface SkillsProficiencyProps {
	groupedSkills: Array<SkillGroup>;
	className?: string;
}

const SkillsProficiency: FC<SkillsProficiencyProps> = ({
	groupedSkills,
	className = ""
}) => {
	return (
		<div className={CssUtils.mergeClasses("flex flex-col gap-8", className)}>
			{groupedSkills.map((groupedSkill, index) => (
			<Card
				key={index}
				aria-labelledby={groupedSkill.category}
				className={CssUtils.mergeClasses(
					"flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700",
					"overflow-hidden duration-200 p-8 gap-6",
					className
				)}
				component="article">

				<SkillsGridHeader groupedSkill={groupedSkill} />

				<CardContent className="space-y-4">
					{groupedSkill.technologies.map((technologyItem, technologyItemIndex) => (
					<Fragment key={technologyItemIndex}>
						<div className="flex justify-between mb-2">
							<Text id={`label-${technologyItem.name}`}>
								{technologyItem.name}
							</Text>
							{technologyItem.level && (
							<Text size="small">
								{`${technologyItem.level}%`}
							</Text>
							)}
						</div>

						{technologyItem.level && (
						<div
							aria-labelledby={`label-${technologyItem.name}`}
							aria-valuenow={technologyItem.level}
							aria-valuemin="0"
							aria-valuemax="100"
							className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden"
							role="progressbar">
							<div
								className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-1000 ease-out"
								style={{ width: `${technologyItem.level}%` }}>
							</div>
						</div>
						)}
					</Fragment>
					))}
				</CardContent>

			</Card>
			))}
		</div>
	);
};

SkillsProficiency.displayName = "SkillsProficiency";

export default SkillsProficiency;
