"use client";

import { useMemo } from "react";

import { Alert, Backdrop } from "@otuekong-portfolio/curio";
import { ApplicationContextState } from "@otuekong-portfolio/features/core";
import { BreadcrumbUtils, NavigationState } from "@otuekong-portfolio/features/navigation";
import { CompositeMainView as HelloworldCompositeMainView } from "@otuekong-portfolio/features/helloworld-composite-client";

import { PortfolioView } from "../../common";

import LookbookView from "./lookbookView";

export interface CompositeHeadlessMainProps {
	applicationContextState: ApplicationContextState;
	navigationState: NavigationState;
}

function CompositeHeadlessMain({
	applicationContextState,
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

	const targetAppId = useMemo(() => {
		if(applicationContextState.role === "CONTAINER_APP" && applicationContextState.selectedApp) {
			return applicationContextState.selectedApp.manifest.name;
		}
		return "";
	}, [applicationContextState]);

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
				clientId={applicationContextState.app.name}
				lastActiveBreadcrumb={lastActiveBreadcrumb}
				onNavigate={onNavigate}
				targetAppId={targetAppId}
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
