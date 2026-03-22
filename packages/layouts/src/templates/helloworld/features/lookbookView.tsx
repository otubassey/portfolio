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
import { LookbookPageSectionName } from "../constants";
import { COMPONENT_REGISTRY } from "../registry";

import SidebarNavigation from "./sidebarNavigation";

const SectionClassname = {
	CONTAINER: "flex flex-col gap-8 p-8",
	SECTION: "flex flex-col gap-8"
} as const;

interface LookbookViewProps {
	selectedPageSection: LookbookPageSectionName | null;
}

function LookbookView({
	onPageSectionSelect,
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
							parameters={manifest?.parameters}
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
					onComponentChange={onPageSectionSelect}
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
						parameters={manifest?.parameters}
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
