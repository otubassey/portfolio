"use client";

import { IconButton, IconButtonProps, Link } from "@otuekong-portfolio/curio";

import { CONTACT_DETAILS } from "../../data";

export interface GitHubLinkButtonProps extends Partial<IconButtonProps> {
	/** Optional repository name to link to (e.g., 'portfolio') */
	repositoryUrl?: string;
}

const GitHubLinkButton = ({ repositoryUrl, ...props }: GitHubLinkButtonProps) => {
	const href = repositoryUrl ? `${CONTACT_DETAILS.github}/${repositoryUrl}` : CONTACT_DETAILS.github;

	return (
		<Link href={href}>
			<IconButton
				aria-label="Visit GitHub"
				icon="github"
				iconProps={{
					fill: "none"
				}}
				{...props}
			/>
		</Link>
	);
};

GitHubLinkButton.displayName = "GitHubLinkButton";

export default GitHubLinkButton;
