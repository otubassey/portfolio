"use client";

import { FC, useId } from "react";

import { useToggle } from "@otuekong-portfolio/common";
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CssUtils,
	Heading,
	List,
	ListItem,
	ListItemText,
	StatusChip,
	Text,
	Typography
} from "@otuekong-portfolio/design-system";

import { TechnologyChips } from "../../../professional";

import { Experience } from "../../data";

const EXPERIENCE_STATUS_MAPPING = {
	active: { color: "success", label: "Active" },
	completed: { color: "default", label: "Completed" }
} as const;

export interface ExperienceCardProps extends Experience {
	className?: string;
	defaultExpanded?: boolean;
}

const ExperienceCard: FC<ExperienceCardProps> = ({
	company,
	description,
	endDate,
	id,
	isCurrent,
	projectTitle,
	responsibilities,
	startDate,
	technologies,
	title,
	className = "",
	defaultExpanded = false
}) => {
	const controlId = useId();
	const [isExpanded, toggleIsExpanded] = useToggle(defaultExpanded);

	return (
		<Card
			aria-labelledby={id}
			className={CssUtils.mergeClasses(
				"flex flex-col bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700",
				"overflow-hidden duration-200 p-8 gap-6",
				className
			)}
			component="article">

			<CardHeader
				className="gap-2"
				headingProps={{ level: 3 }}
				title={title}>

				{projectTitle && (
				<Typography
					className="italic"
					variant="subtitle1"
					weight="semibold">
					{projectTitle}
				</Typography>
				)}

				<Text muted className="flex items-center gap-2">
					<span className="font-medium">{company}</span>
					<span aria-hidden="true" className="opacity-30">|</span>
					<span className="flex items-center gap-1 whitespace-nowrap">
						<time dateTime={startDate}>{startDate}</time>
						<span aria-hidden="true">—</span>
						<time dateTime={endDate}>{endDate}</time>
					</span>
				</Text>

				<StatusChip
					status={isCurrent ? "active" : "completed"}
					statusMapping={EXPERIENCE_STATUS_MAPPING}
				/>

			</CardHeader>

			<CardContent className="flex flex-col gap-6">

				<Text className="text-gray-700 dark:text-gray-300 leading-relaxed">
					{description}
				</Text>

				<TechnologyChips
					only={technologies}
					chipProps={{ size: "medium" }}
				/>

			</CardContent>

			{responsibilities.length > 0 && (
			<>
				<CardActions className="p-0">
					<Button
						aria-controls={controlId}
						aria-expanded={isExpanded}
						endIcon={isExpanded ? "chevron-up" : "chevron-down"}
						endIconProps={{
							role: undefined
						}}
						onClick={() => toggleIsExpanded(!isExpanded)}
						size="small"
						variant="text">
						{isExpanded ? "Hide" : "View"} Details
					</Button>
				</CardActions>

				{isExpanded && (
				<CardContent className="flex flex-col gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
					<Heading
						level={4}>
						Key Responsibilities:
					</Heading>

					<List component="ol" listStyleType="inherit" id={controlId}>
						{responsibilities.map((responsibility, index) => (
							<ListItem key={index}>
								<ListItemText primary={responsibility} />
							</ListItem>
						))}
					</List>

				</CardContent>
				)}
			</>
			)}

		</Card>
	);
};

ExperienceCard.displayName = "ExperienceCard";

export default ExperienceCard;
