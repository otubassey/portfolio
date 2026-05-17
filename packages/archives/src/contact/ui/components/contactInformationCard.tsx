"use client";

import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CssUtils,
	Icon,
	Text
} from "@otuekong-portfolio/curio";

import { GitHubLinkButton, LinkedInLinkButton } from "./professionalLinkButtons";

interface ContactInformationCardProps {
	location: string;
	className?: string;
	id?: string;
}

function ContactInformationCard({
	location,
	className = "",
	id
}: ContactInformationCardProps) {
	return (
		<Card
			aria-labelledby={id}
			className={CssUtils.mergeClasses(
				"flex flex-col gap-6 bg-white dark:bg-gray-800 w-auto rounded-xl",
				"p-8 shadow-md border border-gray-200 dark:border-gray-700",
				className
			)}
			component="article">

			<CardHeader
				className="p-0"
				headingProps={{
					id,
					level: 3
				}}
				title="Contact Information"
			/>

			<CardContent
				className="flex flex-col gap-6"
				component="dl">

				{location && (
				<div className="flex items-start gap-4">
					<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
						<Icon
							className="text-blue-600 dark:text-blue-400"
							name="map-pin"
							size={20}
						/>
					</div>
					<div>

						<Text component="dt" muted size="small">Location</Text>

						<Text component="dd">
							{location}
						</Text>

					</div>
				</div>
				)}

			</CardContent>

			<CardActions
				className="flex items-center gap-4 p-0"
				component="footer">

				<GitHubLinkButton />

				<LinkedInLinkButton />

			</CardActions>

		</Card>
	);
}

ContactInformationCard.displayName = "ContactInformationCard";

export default ContactInformationCard;
