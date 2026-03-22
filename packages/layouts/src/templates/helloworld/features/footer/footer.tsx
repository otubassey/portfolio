"use client";

import { ProfileCopyright } from "@otuekong-portfolio/core";
import { ErrorBoundary, Footer as DSFooter } from "@otuekong-portfolio/design-system";

interface FooterProps {}

function Footer({}: FooterProps) {
	return (
		<ErrorBoundary>
			<DSFooter>
				<ProfileCopyright />
			</DSFooter>
		</ErrorBoundary>
	)
}

export default Footer;
