"use client";

import {
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CssUtils,
	Icon,
	IconName,
	Link,
	Text
} from "@otuekong-portfolio/curio";

import { ContactDetailsAttributes } from "../data";

import { GitHubLinkButton, LinkedInLinkButton } from "./professionalLinkButtons";

export interface ContactDetail {
	href?: string;
	icon: string;
	label: string;
	value: string;
}

function getContactDetails(
	email: string,
	location: string,
	phone: string
): Array<ContactDetail> {
	return [
		{ icon: "mail", value: email, label: "Email", href: `mailto:${email}` },
		{ icon: "phone", value: phone, label: "Phone", href: `tel:${phone}` },
		{ icon: "map-pin", value: location, label: "Location" },
	].filter(detail => detail.value);
}

interface ContactInformationCardProps {
	contactDetails: ContactDetailsAttributes;
	className?: string;
	id?: string;
}

function ContactInformationCard({
	contactDetails,
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

				{getContactDetails(contactDetails.email, contactDetails.location, contactDetails.phone)
				.map((detail, index) => (
					<div key={index} className="flex items-start gap-4">
						<div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
							<Icon
								className="text-blue-600 dark:text-blue-400"
								name={detail.icon as IconName}
								size={20}
							/>
						</div>
						<div>

							<Text component="dt" muted size="small">{detail.label}</Text>

							<Text component="dd">
								{detail.href
								? (
									<Link
										className="-m-2 p-2 text-gray-900 dark:text-white font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
										href={detail.href}>
										{detail.value}
									</Link>
								)
								: detail.value
								}
							</Text>

						</div>
					</div>
				))}

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
