"use client";

import { JSX, LazyExoticComponent, useMemo } from "react";

import { Alert } from "@otuekong-portfolio/curio";
import {
	AppManifestUtils,
	ContainerApplicationContextState,
	Footer,
	HostedAppManifestSummary,
	GalleryHeader,
	useNavigation,
	useApplicationContext
} from "@otuekong-portfolio/features/core";
import {
	GalleryDirectory,
	GalleryDirectoryItem
} from "@otuekong-portfolio/features/pavilion";

import { PageContainer } from "../../common/ui";

const mapGalleryDirectoryItems = (
	summaries: ReadonlyArray<HostedAppManifestSummary>
): ReadonlyArray<GalleryDirectoryItem> => (
	summaries.filter(Boolean).map(summary => ({
		family: summary.family,
		value: summary.label ?? "Unknown"
	}))
);

function PavilionMain() {
	const [applicationContextState, setSelectedAppDetail] = useApplicationContext<ContainerApplicationContextState>();

	const navigationState = useNavigation();

	const manifestSummaries = useMemo(() => (
		applicationContextState.app.hostedApps
			.map(appDetail => (AppManifestUtils.toSummary(appDetail.manifest)))
	), []);

	const hasManifestSummaries = Array.isArray(manifestSummaries) && manifestSummaries.length > 0;

	const galleryDirectoryItems = useMemo(() => (
		hasManifestSummaries ? mapGalleryDirectoryItems(manifestSummaries) : []
	), [manifestSummaries]);

	const selectedManifestSummary = useMemo(() => (
		applicationContextState.selectedApp?.manifest
			? AppManifestUtils.toSummary(applicationContextState.selectedApp.manifest)
			: null
	), [applicationContextState]);

	const selectedGalleryDirectoryItem = useMemo(() => (
		selectedManifestSummary ? mapGalleryDirectoryItems([selectedManifestSummary])[0] : null
	), [selectedManifestSummary]);

	const handleGalleryDirectoryItemSelect = (item: GalleryDirectoryItem) => {
		const matchingManifestSummary = manifestSummaries?.find(manifestSummary => (
			manifestSummary.family === item.family &&
			manifestSummary.label === item.value
		)) ?? null;
		const isNewManifestSummary = !AppManifestUtils.areEqual(selectedManifestSummary, matchingManifestSummary);
		const newlySelectedAppDetail = isNewManifestSummary
			? applicationContextState.app.hostedApps.find(hostedApp => (
				AppManifestUtils.matches(matchingManifestSummary, AppManifestUtils.toSummary(hostedApp.manifest))
			))
			: applicationContextState.selectedApp;
		setSelectedAppDetail(newlySelectedAppDetail ?? null);
	};

	if(!applicationContextState.selectedApp?.component || !hasManifestSummaries || !selectedManifestSummary) {
		// TODO: Replace with a container landing page
		return (
			<PageContainer>

				<Alert
					severity="info"
					message="Select Application to be displayed"
				/>

				<Footer />

			</PageContainer>
		);
	}

	const ComponentToRender: LazyExoticComponent<(props?: any) => JSX.Element> = applicationContextState.selectedApp.component;
	if(!ComponentToRender) {
		return (
			<PageContainer>

				<Alert
					severity="error"
					message={`No application found for '${selectedManifestSummary.family}' with name '${selectedManifestSummary.name}'.`}
				/>

				<Footer />

			</PageContainer>
		);
	}

	return (
		<PageContainer>
			<GalleryHeader>
				<GalleryDirectory
					items={galleryDirectoryItems}
					onItemSelect={handleGalleryDirectoryItemSelect}
					selectedItem={selectedGalleryDirectoryItem}
				/>
			</GalleryHeader>

			<ComponentToRender
				applicationContextState={applicationContextState}
				navigationState={navigationState}
			/>

			<Footer />
		</PageContainer>
	);
}

export default PavilionMain;
