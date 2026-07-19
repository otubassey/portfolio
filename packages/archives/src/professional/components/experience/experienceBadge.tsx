"use client";

import { FC } from "react";

import { Badge, CssUtils, Text, Typography } from "@otuekong-portfolio/curio";

import {EXPERIENCES, Experience} from "../../data";

function calculateTotalYearsOfExperience(experiences: ReadonlyArray<Experience>): number {
    if(!experiences || experiences.length === 0) {
        return 0;
    }

    const startYears = experiences.map(item => parseInt(item.startDate, 10));
    const oldestStartYear = Math.min(...startYears);

    const currentYear = new Date().getFullYear();
    const count = currentYear - oldestStartYear;

    return Math.max(0, count);
}

export interface ExperienceBadgeProps {
	className?: string;
}

const ExperienceBadge: FC<ExperienceBadgeProps> = ({
	className = ""
}) => {
	return (
		<Badge
			className={CssUtils.mergeClasses(
				"gap-4 px-8 py-5 w-full border border-gray-200 dark:border-blue-500/20",
				"shadow-xl shadow-gray-200/80 justify-around dark:shadow-blue-500/10",
				className
			)}
			elevation={5}
			rounded
			shade="light">

				<Typography
					className={CssUtils.mergeClasses(
						"leading-none bg-clip-text text-transparent",
						"bg-gradient-to-b from-gray-400 to-gray-900 dark:from-gray-500 dark:to-blue-400"
					)}
					component="span"
					color="inherit"
					variant="h4"
					weight="bold">
					{calculateTotalYearsOfExperience(EXPERIENCES)}
				</Typography>

				<div className="border-l border-gray-200 dark:border-cyan-500/20 pl-6">

					<Typography
						align="right"
						className="text-purple-600 dark:text-purple-400 tracking-wider"
						variant="subtitle1"
						weight="semibold">
						Years
					</Typography>

					<Text
						align="right"
						color="muted"
						size="small"
						weight="medium">
						Experience
					</Text>

				</div>
		</Badge>
	);
};

ExperienceBadge.displayName = "ExperienceBadge";

export default ExperienceBadge;
