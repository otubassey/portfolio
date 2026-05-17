"use client";

import { Alert, Backdrop } from "@otuekong-portfolio/curio";
import { BreadcrumbUtils, HelloworldCompositeMainView, NavigationState } from "@otuekong-portfolio/features";

import { PortfolioView } from "../components";

import LookbookView from "./lookbookView";

export interface CompositeHeadlessMainProps {
	navigationState: NavigationState;
}

function CompositeHeadlessMain({
	navigationState
}: CompositeHeadlessMainProps) {
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

			{firstActiveBreadcrumb?.name === HelloworldCompositeMainView.PORTFOLIO && (
			<PortfolioView
				breadcrumbs={BreadcrumbUtils.filterByParent(breadcrumbs, firstActiveBreadcrumb.name)}
				lastActiveBreadcrumb={lastActiveBreadcrumb}
				onNavigate={onNavigate}
			/>
			)}

			{firstActiveBreadcrumb?.name === HelloworldCompositeMainView.LOOKBOOK && (
			<LookbookView
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

export default CompositeHeadlessMain;
