"use client";

import { ErrorBoundary, Footer as DSFooter } from "@otuekong-portfolio/curio";
import { Copyright } from "@otuekong-portfolio/features";

interface FooterProps {}

function Footer({}: FooterProps) {
	return (
		<ErrorBoundary>
			<DSFooter>
				<Copyright />
			</DSFooter>
		</ErrorBoundary>
	)
}

export default Footer;
