"use client";

import { ComponentManifest } from "@otuekong-portfolio/curio";
import {
	Breadcrumb,
	HELLOWORLD_COMPONENT_REGISTRY,
	LookbookCodeSnippetSection,
	LookbookDocumentationSection,
	LookbookPlaygroundSection,
	LookbookPropsSection,
	NavigationList,
	OnNavigateHandler,
	useLoadLookbookManifest
} from "@otuekong-portfolio/features";

import { PageLayoutShell } from "../components";

const SectionClassname = {
	CONTAINER: "flex flex-col gap-8 p-8",
	SECTION: "flex flex-col gap-8"
} as const;

interface LookbookViewContentProps {
	componentName: string | null | undefined;
	isManifestLoading: boolean;
	manifest: ComponentManifest<any> | null;
	manifestError: Error | null;
	onComponentChange: (name: string) => void;
}

function LookbookViewContent({
	componentName,
	isManifestLoading,
	manifest,
	manifestError,
	onComponentChange
}: LookbookViewContentProps) {
	return (
		<LookbookDocumentationSection
			className={SectionClassname.CONTAINER}
			isManifestLoading={isManifestLoading}
			manifest={manifest}
			manifestError={manifestError}
			selectedComponent={componentName ?? ""}>

			{manifest && (
			<>
				<LookbookPropsSection
					className={SectionClassname.SECTION}
					manifest={manifest}
					onExtendedComponentClick={onComponentChange}
				/>

				<LookbookCodeSnippetSection
					className={SectionClassname.SECTION}
					manifest={manifest}
				/>

				<LookbookPlaygroundSection
					className={SectionClassname.SECTION}
					manifest={manifest}
				/>
			</>
			)}

		</LookbookDocumentationSection>
	);
}

LookbookViewContent.displayName = "LookbookViewContent";

interface LookbookViewProps {
	breadcrumbs: ReadonlyArray<Breadcrumb>;
	lastActiveBreadcrumb: Breadcrumb | undefined;
	onNavigate: OnNavigateHandler;
}

function LookbookView({
	breadcrumbs,
	lastActiveBreadcrumb,
	onNavigate
}: LookbookViewProps) {
	const {
		isManifestLoading,
		manifest,
		manifestError
	} = useLoadLookbookManifest(HELLOWORLD_COMPONENT_REGISTRY, lastActiveBreadcrumb?.name ?? "");

	return (
		<PageLayoutShell
			mobileContent={
				<LookbookViewContent
					componentName={lastActiveBreadcrumb?.name ?? ""}
					isManifestLoading={isManifestLoading}
					manifest={manifest}
					manifestError={manifestError}
					onComponentChange={onNavigate}
				/>
			}
			sidebar={
				<NavigationList
					breadcrumbs={breadcrumbs}
					disabled={isManifestLoading}
					flatten
					onNavigate={onNavigate}
				/>
			}>

			<LookbookViewContent
				componentName={lastActiveBreadcrumb?.name ?? ""}
				isManifestLoading={isManifestLoading}
				manifest={manifest}
				manifestError={manifestError}
				onComponentChange={onNavigate}
			/>

		</PageLayoutShell>
	);
}

export default LookbookView;
