import { FC } from "react";

import { Project } from "../data";
import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CssUtils,
	Heading,
	IconButton,
	Link,
	StatusChip,
	Text
} from "@otuekong-portfolio/design-system";

import { GitHubLinkButton } from "../../contact";
import { TechnologyChips } from "../../professional";

const PROJECT_STATUS_MAPPING = {
	completed: { color: "default", label: "Completed" },
	"in-progress": { color: "secondary", label: "In Progress" },
	"Not Assigned": { color: "warning", label: "Not Assigned" },
} as const;

export interface ProjectCardProps extends Project {
	className?: string;
}

const ProjectCard: FC<ProjectCardProps> = ({
	demoUrl,
	description,
	id,
	icon,
	repositoryUrl,
	technologies,
	title,
	className = "",
	status
}) => {
	return (
		<Card
			aria-labelledby={id}
			className={CssUtils.mergeClasses(
				"bg-white dark:bg-gray-800 rounded-xl",
				"overflow-hidden duration-200 p-8 gap-6",
				className
			)}
			component="article"
			outlined>

			<CardHeader className="gap-2">

				<Heading
					className="font-bold text-gray-900 dark:text-gray-100"
					id={id}
					level={3}>
					{title}
				</Heading>

				<StatusChip
					status={status}
					statusMapping={PROJECT_STATUS_MAPPING}
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

			<CardActions
				className="flex items-center gap-4 p-0"
				component="footer">

				<GitHubLinkButton repositoryUrl={repositoryUrl} />

				{demoUrl && (
				<Link href={demoUrl}>
					<IconButton
						aria-label={`Visit ${title} live site`}
						icon={icon}
						iconProps={{
							fill: "none"
						}}
					/>
				</Link>
				)}

			</CardActions>

		</Card>
	);
};

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
