"use client";

import { JSX, LazyExoticComponent, useMemo } from "react";

import { Alert } from "@otuekong-portfolio/curio";
import {
	AppManifestSummary,
	Footer,
	GalleryDirectory,
	GalleryDirectoryItem,
	GalleryHeader,
	useNavigation
} from "@otuekong-portfolio/features";

import { PageContainer } from "../common";

const mapGalleryDirectoryItems = (
	summaries: ReadonlyArray<AppManifestSummary>
): ReadonlyArray<GalleryDirectoryItem> => (
	summaries.filter(Boolean).map(summary => ({
		family: summary.family,
		value: summary.label ?? "Unknown"
	}))
);

interface PavilionMainProps {
	component?: LazyExoticComponent<(props?: any) => JSX.Element>;
	manifestSummaries?: ReadonlyArray<AppManifestSummary>;
	onAppManifestSummarySelect?: (summary: AppManifestSummary) => void;
	selectedManifestSummary?: AppManifestSummary | null;
}

function PavilionMain({
	component,
	manifestSummaries,
	onAppManifestSummarySelect,
	selectedManifestSummary
}: PavilionMainProps) {
	const navigationState = useNavigation();

	const hasManifestSummaries = Array.isArray(manifestSummaries) && manifestSummaries.length > 0;

	const galleryDirectoryItems = useMemo(() => (
		hasManifestSummaries ? mapGalleryDirectoryItems(manifestSummaries) : []
	), [manifestSummaries]);

	const selectedGalleryDirectoryItem = useMemo(() => (
		selectedManifestSummary ? mapGalleryDirectoryItems([selectedManifestSummary])[0] : null
	), [selectedManifestSummary]);

	const handleGalleryDirectoryItemSelect = (item: GalleryDirectoryItem) => {
		const matchingManifestSummary = manifestSummaries?.find(manifestSummary => (
			manifestSummary.family === item.family &&
			manifestSummary.label === item.value
		)) ?? null;
		if(matchingManifestSummary) {
			onAppManifestSummarySelect?.(matchingManifestSummary);
		}
	};

	if(!component || !hasManifestSummaries || !selectedManifestSummary) {
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

	const ComponentToRender = component;
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
				navigationState={navigationState}
			/>

			<Footer />
		</PageContainer>
	);
}

export default PavilionMain;
