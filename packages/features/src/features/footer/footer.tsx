"use client";

import { Copyright } from "@otuekong-portfolio/archives";
import { ErrorBoundary, Footer as DSFooter } from "@otuekong-portfolio/curio";

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
