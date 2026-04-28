"use client";

import { FC } from "react";

import { CardHeader, CssUtils, Heading } from "@otuekong-portfolio/curio";

import { SkillGroup } from "../../data";

export interface SkillsGridHeaderProps {
	groupedSkill: SkillGroup;
	className?: string;
}

export const SkillsGridHeader: FC<SkillsGridHeaderProps> = ({
	groupedSkill,
	className = ""
}) => {
	return (
		<CardHeader
			className={CssUtils.mergeClasses(
				"flex-row gap-3",
				className
			)}>

			<span
				aria-label={groupedSkill.emojiLabel}
				className="text-3xl"
				role="img">
				{groupedSkill.emoji}
			</span>

			<Heading
				className="font-bold text-gray-900 dark:text-gray-100"
				id={groupedSkill.category}
				level={3}>
				{groupedSkill.category}
			</Heading>

		</CardHeader>
	);
};

SkillsGridHeader.displayName = "SkillsGridHeader";

export default SkillsGridHeader;
