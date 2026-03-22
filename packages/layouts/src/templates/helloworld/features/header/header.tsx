"use client";

import { ErrorBoundary } from "@otuekong-portfolio/design-system";

import { useAppDetails } from "../../providers";

import {DesktopHeader} from "./desktop";
import {MobileHeader} from "./mobile";

export interface HeaderProps {}

function Header({}: HeaderProps) {
	const {
		appDetailsByFamily,
		isMobileMenuOpen,
		onAppDetailSelect,
		onPageSectionSelect,
		onPageSelect,
		pageDetails,
		selectedAppDetail,
		selectedPage,
		selectedPageSection,
		toggleIsMobileMenuOpen
	} = useAppDetails();

	return (
		<ErrorBoundary>
			<DesktopHeader
				activePage={selectedPage}
				appDetail={selectedAppDetail}
				appDetailsByFamily={appDetailsByFamily}
				className="border-b border-gray-200 dark:border-gray-700 bg-ps-surface"
				onAppDetailSelect={onAppDetailSelect}
				onPageSelect={onPageSelect}
				pageDetails={pageDetails}
			/>

			<MobileHeader
				activePage={selectedPage}
				activePageSection={selectedPageSection}
				appDetail={selectedAppDetail}
				appDetailsByFamily={appDetailsByFamily}
				className="border-b border-gray-200 dark:border-gray-700 bg-ps-surface z-ps-appbar"
				isMenuOpen={isMobileMenuOpen}
				onAppDetailSelect={onAppDetailSelect}
				onMobilePageSectionSelect={onPageSectionSelect}
				onPageSelect={onPageSelect}
				pageDetails={pageDetails}
				toggleIsMenuOpen={toggleIsMobileMenuOpen}
			/>
		</ErrorBoundary>
	);
}

export default Header;
