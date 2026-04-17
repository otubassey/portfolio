"use client";

import {
	CodeSnippetSection,
	DocumentationSection,
	PlaygroundSection,
	PropsSection,
	useLoadLookbookManifest
} from "@otuekong-portfolio/features";

import { LookbookPageSectionName, MainPageSectionType } from "../../constants";
import { OnPageSectionSelectHandler } from "../../features/types";
import { COMPONENT_REGISTRY } from "../../registry";

import { PageLayoutShell } from "../components";

import SidebarNavigation from "./sidebarNavigation";

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
		isManifestLoading,
		manifest,
		manifestError
	} = useLoadLookbookManifest(COMPONENT_REGISTRY, selectedPageSection);

	return (
		<PageLayoutShell
			mobileContent={
				<DocumentationSection
					className={SectionClassname.CONTAINER}
					isManifestLoading={isManifestLoading}
					manifest={manifest}
					manifestError={manifestError}
					selectedComponent={selectedPageSection}>

					{manifest && (
					<>
						<PropsSection
							className={SectionClassname.SECTION}
							manifest={manifest}
							onExtendedComponentClick={
								(component) => onComponentChange(component as MainPageSectionType)
							}
						/>

						<CodeSnippetSection
							className={SectionClassname.SECTION}
							manifest={manifest}
						/>

						<PlaygroundSection
							className={SectionClassname.SECTION}
							manifest={manifest}
						/>
					</>
					)}

				</DocumentationSection>
			}
			sidebar={
				<SidebarNavigation
					selectedComponent={selectedPageSection}
					onComponentChange={onComponentChange}
				/>
			}>

			<DocumentationSection
				className={SectionClassname.CONTAINER}
				isManifestLoading={isManifestLoading}
				manifest={manifest}
				manifestError={manifestError}
				selectedComponent={selectedPageSection}>

				{manifest && (
				<>
					<PropsSection
						className={SectionClassname.SECTION}
						manifest={manifest}
						onExtendedComponentClick={
							(component) => onComponentChange(component as MainPageSectionType)
						}
					/>

					<CodeSnippetSection
						className={SectionClassname.SECTION}
						manifest={manifest}
					/>

					<PlaygroundSection
						className={SectionClassname.SECTION}
						manifest={manifest}
					/>
				</>
				)}

			</DocumentationSection>

		</PageLayoutShell>
	);
}

export default LookbookView;
