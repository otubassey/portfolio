"use client";

import { IconButton, Link, LinkButtonProps } from "@otuekong-portfolio/design-system";

import { CONTACT_DETAILS } from "../../data";

const LinkedInLinkButton = (props: Partial<LinkButtonProps>) => (
	<Link href={CONTACT_DETAILS.linkedin}>
		<IconButton
			aria-label="Visit LinkedIn"
			icon="linkedin"
			iconProps={{
				fill: "none"
			}}
			{...props}
		/>
	</Link>
);

export default LinkedInLinkButton;
