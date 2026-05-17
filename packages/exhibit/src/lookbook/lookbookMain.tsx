"use client";

import { useEffect, useMemo } from "react";

import {
	COMPONENTS_BY_CATEGORY,
	COMPONENT_REGISTRY,
	Alert,
	Backdrop,
	CssUtils,
	ErrorBoundary,
	useToggle
} from "@otuekong-portfolio/curio";
import {
	BreadcrumbUtils,
	LookbookCodeSnippetSection,
	LookbookDocumentationSection,
	LookbookPlaygroundSection,
	LookbookPropsSection,
	useLoadLookbookManifest,
	useNavigation
} from "@otuekong-portfolio/features";

import { Header, Sidebar } from "./components";

export interface LookbookMainProps {}

function LookbookMain({}: LookbookMainProps) {
	const {
		breadcrumbs,
		lastActiveBreadcrumb,
		onNavigate,
	} = useNavigation();

	const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useToggle(false);
	const [isMobileSearchOpen, toggleIsMobileSearchOpen] = useToggle(false);

	const {
		isManifestLoading,
		manifest,
		manifestError
	} = useLoadLookbookManifest(COMPONENT_REGISTRY, lastActiveBreadcrumb?.name ?? "");

	const navigableItems = useMemo(() => (BreadcrumbUtils.getNavigableItems(breadcrumbs)), [breadcrumbs]);

	const groupedNavigableItems = useMemo(() => (
		BreadcrumbUtils.groupByRegistry(navigableItems, COMPONENTS_BY_CATEGORY)
	), [navigableItems]);

	const uncategorizedWarningMessage = useMemo(() => {
		if(!Array.isArray(groupedNavigableItems.Uncategorized)
			|| !groupedNavigableItems.Uncategorized.length) {
			return "";
		}
		const names = groupedNavigableItems.Uncategorized.map(b => `"${b.name}"`).join(", ");
		return `Unmapped components: ${names}. Please update registry to include them.`;
	}, [groupedNavigableItems]);

	useEffect(() => {
		const firstGroup = Object.values(groupedNavigableItems).find(list => list.length > 0);
		if(firstGroup?.length) {
			const firstBreadcrumb = firstGroup[0];
			onNavigate(firstBreadcrumb.name);
		}
	}, []);

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
			<ErrorBoundary>
				<Header
					isMobileMenuOpen={isMobileMenuOpen}
					isMobileSearchOpen={isMobileSearchOpen}
					onComponentClick={onNavigate}
					onIsMobileMenuToggle={toggleIsMobileMenuOpen}
					onIsMobileSearchOpen={toggleIsMobileSearchOpen}
					searchItems={navigableItems}
				/>
			</ErrorBoundary>

			{Boolean(uncategorizedWarningMessage) && (
			<div className={CssUtils.mergeClasses(
				"flex items-center pt-17",
				isMobileSearchOpen ? "pt-30" : "pt-17"
			)}>
				<Alert
					message="Unmapped Components Found"
					detail={uncategorizedWarningMessage}
					severity="warning"
					variant="outlined"
				/>
			</div>
			)}

			<div className="flex">
				{/* Sidebar */}
				<Sidebar
					breadcrumbs={navigableItems}
					disabled={isManifestLoading}
					isMobileMenuOpen={isMobileMenuOpen}
					onComponentClick={onNavigate}
					onIsMobileMenuToggle={toggleIsMobileMenuOpen}
				/>

				{/* Mobile Overlay */}
				{isMobileMenuOpen && (
				<Backdrop
					onClick={() => toggleIsMobileMenuOpen(false)}
					open
				/>
				)}

				<ErrorBoundary>
					{/* Main Content */}
					<main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)]">
						<div className="max-w-7xl mx-auto p-6 md:p-8">

							<LookbookDocumentationSection
								className="flex flex-col gap-8 p-8"
								isManifestLoading={isManifestLoading}
								manifest={manifest}
								manifestError={manifestError}
								selectedComponent={lastActiveBreadcrumb?.name ?? ""}>

								{manifest && (
								<>
									<LookbookPropsSection
										className="flex flex-col gap-8"
										manifest={manifest}
										onExtendedComponentClick={onNavigate}
									/>

									<LookbookCodeSnippetSection
										className="flex flex-col gap-8"
										manifest={manifest}
									/>

									<LookbookPlaygroundSection
										className="flex flex-col gap-8"
										manifest={manifest}
									/>
								</>
								)}

							</LookbookDocumentationSection>

						</div>
					</main>
				</ErrorBoundary>
			</div>
		</div>
	);
}

export default LookbookMain;
