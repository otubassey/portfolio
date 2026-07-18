"use client";

import { useMemo } from "react";

import { Alert, Backdrop } from "@otuekong-portfolio/curio";
import { ApplicationContextState } from "@otuekong-portfolio/features/core";
import { BreadcrumbUtils, NavigationState } from "@otuekong-portfolio/features/navigation";
import { ClassicMainView as HellworldClassicMainView } from "@otuekong-portfolio/features/helloworld-classic-client";

import { PortfolioView } from "../../common";

export interface ClassicHeadlessMainProps {
	applicationContextState: ApplicationContextState;
	navigationState: NavigationState;
}

function ClassicHeadlessMain({
	applicationContextState,
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

			{firstActiveBreadcrumb?.name === HellworldClassicMainView.PORTFOLIO && (
			<PortfolioView
				breadcrumbs={BreadcrumbUtils.filterByParent(breadcrumbs, firstActiveBreadcrumb.name)}
				clientId={applicationContextState.app.name}
				lastActiveBreadcrumb={lastActiveBreadcrumb}
				onNavigate={onNavigate}
				targetAppId={targetAppId}
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
