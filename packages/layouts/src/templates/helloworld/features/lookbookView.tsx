"use client";

import {
	LookbookComponentDocumentationHeading,
	LookbookComponentCodeSnippet,
	LookbookComponentDocumentationApi,
	LookbookComponentDocumentationLayout,
	LookbookComponentPlayground,
	useLoadLookbookManifest
} from "../../lookbook";

import { PageLayoutShell } from "../components";
import { LookbookPageSectionName, MainPageSectionType } from "../constants";
import { COMPONENT_REGISTRY } from "../registry";

import SidebarNavigation from "./sidebarNavigation";
import { OnPageSectionSelectHandler } from "./types";

const SectionClassname = {
	CONTAINER: "flex flex-col gap-8 p-8",
	SECTION: "flex flex-col gap-8"
} as const;

interface LookbookViewProps {
	onComponentChange: OnPageSectionSelectHandler;
	selectedPageSection: LookbookPageSectionName | null;
}

function LookbookView({
	onComponentChange,
	selectedPageSection
}: LookbookViewProps) {
	const {
		isLoadingManifest,
		manifest,
		manifestError
	} = useLoadLookbookManifest(COMPONENT_REGISTRY, selectedPageSection);

	return (
		<PageLayoutShell
			mobileContent={
				<LookbookComponentDocumentationLayout
					className={SectionClassname.CONTAINER}
					heading={
						<LookbookComponentDocumentationHeading
							name={selectedPageSection}
							status={manifest?.status}
						/>
					}
					description={manifest?.description}
					isLoadingManifest={isLoadingManifest}
					manifest={manifest}
					manifestError={manifestError}
					selectedComponent={selectedPageSection}>

					{manifest && (
					<>
						<LookbookComponentDocumentationApi
							className={SectionClassname.SECTION}
							manifest={manifest}
							onExtendedComponentClick={
								(component) => onComponentChange(component as MainPageSectionType)
							}
						/>

						<LookbookComponentCodeSnippet
							className={SectionClassname.SECTION}
							manifest={manifest}
						/>

						<LookbookComponentPlayground
							className={SectionClassname.SECTION}
							manifest={manifest}
						/>
					</>
					)}

				</LookbookComponentDocumentationLayout>
			}
			sidebar={
				<SidebarNavigation
					selectedComponent={selectedPageSection}
					onComponentChange={onComponentChange}
				/>
			}>

			<LookbookComponentDocumentationLayout
				className={SectionClassname.CONTAINER}
				heading={
					<LookbookComponentDocumentationHeading
						name={selectedPageSection}
						status={manifest?.status}
					/>
				}
				description={manifest?.description}
				isLoadingManifest={isLoadingManifest}
				manifest={manifest}
				manifestError={manifestError}
				selectedComponent={selectedPageSection}>

				{manifest && (
				<>
					<LookbookComponentDocumentationApi
						className={SectionClassname.SECTION}
						manifest={manifest}
						onExtendedComponentClick={
							(component) => onComponentChange(component as MainPageSectionType)
						}
					/>

					<LookbookComponentCodeSnippet
						className={SectionClassname.SECTION}
						manifest={manifest}
					/>

					<LookbookComponentPlayground
						className={SectionClassname.SECTION}
						manifest={manifest}
					/>
				</>
				)}

			</LookbookComponentDocumentationLayout>

		</PageLayoutShell>
	);
}

export default LookbookView;
