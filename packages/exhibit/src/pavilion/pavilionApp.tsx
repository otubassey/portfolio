"use client";

import { useMemo, useState } from "react";

import { ThemeProvider } from "@otuekong-portfolio/curio";
import { ApplicationContextProvider, AppManifestSummary, AppManifestUtils, NavigationProvider } from "@otuekong-portfolio/features";

import APP_DETAILS from "./appDetails";
import PavilionMain from "./pavilionMain";
import { AppDetail } from "./types";

interface PavilionAppProps {}

function PavilionApp({}: PavilionAppProps) {
	const [selectedAppDetail, setSelectedAppDetail] = useState<AppDetail | null>(APP_DETAILS[0]);

	const appManifestSummaries = useMemo(() => (
		APP_DETAILS.map(appDetail => (AppManifestUtils.toSummary(appDetail.manifest)))
	), []);

	const selectedAppManifestSummary = useMemo(() => (
		selectedAppDetail?.manifest
			? AppManifestUtils.toSummary(selectedAppDetail.manifest)
			: null
	), [selectedAppDetail]);

	const handleAppManifestSummarySelect = (selectedSummary: AppManifestSummary) => {
		setSelectedAppDetail(previousSelectedAppDetail => {
			const previousManifestSummary = previousSelectedAppDetail
				? AppManifestUtils.toSummary(previousSelectedAppDetail.manifest)
				: null;
			if(previousManifestSummary && !AppManifestUtils.areEqual(previousManifestSummary, selectedSummary)) {
				const hasMatchingSummary = appManifestSummaries.some((
					appManifestSummary => AppManifestUtils.areEqual(appManifestSummary, selectedSummary)
				));
				const matchingAppDetail = hasMatchingSummary
					? APP_DETAILS.find((
						appDetail => AppManifestUtils.matches(selectedSummary, AppManifestUtils.toSummary(appDetail.manifest))
					))
					: null;
				return matchingAppDetail ?? null;
			}
			return previousSelectedAppDetail;
		});
	};

	if(!selectedAppDetail) {
		return (
			<ThemeProvider>
				<PavilionMain />
			</ThemeProvider>
		);
	}

	return (
		<ApplicationContextProvider app={selectedAppDetail.manifest}>
			<NavigationProvider defaultNavigate>
				<ThemeProvider>
					<PavilionMain
						component={selectedAppDetail.component}
						manifestSummaries={appManifestSummaries}
						selectedManifestSummary={selectedAppManifestSummary}
						onAppManifestSummarySelect={handleAppManifestSummarySelect}
					/>
				</ThemeProvider>
			</NavigationProvider>
		</ApplicationContextProvider>
	);
}

export default PavilionApp;
