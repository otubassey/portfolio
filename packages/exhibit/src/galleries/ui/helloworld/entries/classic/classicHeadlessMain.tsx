"use client";

import { Alert, Backdrop } from "@otuekong-portfolio/curio";
import { BreadcrumbUtils, HellworldClassicMainView, NavigationState } from "@otuekong-portfolio/features";

import { PortfolioView } from "../components";

export interface ClassicHeadlessMainProps {
	navigationState: NavigationState;
}

function ClassicHeadlessMain({
	navigationState
}: ClassicHeadlessMainProps) {
	const {
		breadcrumbs,
		isMobileMenuOpen,
		firstActiveBreadcrumb,
		lastActiveBreadcrumb,
		onNavigate,
		toggleIsMobileMenuOpen
	} = navigationState;

	return (
		<>

			{!firstActiveBreadcrumb && (
			<Alert
				message="Select a view to be displayed"
				severity="info"
			/>
			)}

			{firstActiveBreadcrumb?.name === HellworldClassicMainView.PORTFOLIO && (
			<PortfolioView
				breadcrumbs={BreadcrumbUtils.filterByParent(breadcrumbs, firstActiveBreadcrumb.name)}
				lastActiveBreadcrumb={lastActiveBreadcrumb}
				onNavigate={onNavigate}
			/>
			)}

			{isMobileMenuOpen && (
			<Backdrop
				onClick={() => toggleIsMobileMenuOpen(false)}
				open
			/>
			)}

		</>
	);
}

export default ClassicHeadlessMain;
