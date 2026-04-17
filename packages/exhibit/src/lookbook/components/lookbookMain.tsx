"use client";

import { useMemo, useState } from "react";

import {
	COMPONENTS_BY_CATEGORY,
	COMPONENT_REGISTRY,
	Backdrop,
	ErrorBoundary,
	useToggle
} from "@otuekong-portfolio/curio";
import {
	CodeSnippetSection,
	DocumentationSection,
	PlaygroundSection,
	PropsSection,
	useLoadLookbookManifest
} from "@otuekong-portfolio/features";

import { Header } from "./header";
import Sidebar from "./sidebar";

export interface LookbookLayoutProps {}

function LookbookLayout({}: LookbookLayoutProps) {
	const initialComponent = useMemo<string | null>(() => {
		if(!COMPONENTS_BY_CATEGORY || !Object.keys(COMPONENTS_BY_CATEGORY).length) {
			return null;
		}
		const components = Object.values(COMPONENTS_BY_CATEGORY)[0];
		return components.length > 0 ? components[0] : null;
	}, []);

	const [selectedComponent, setSelectedComponent] = useState<string | null>(initialComponent);
	const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useToggle(false);
	const [isMobileSearchOpen, toggleIsMobileSearchOpen] = useToggle(false);
	const [theme, setTheme] = useState<"light" | "dark">("light");

	const {
		isManifestLoading,
		manifest,
		manifestError
	} = useLoadLookbookManifest(COMPONENT_REGISTRY, selectedComponent);

	const toggleTheme = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<div className={theme === "dark" ? "dark" : ""}>
			<div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
				<ErrorBoundary>
					<Header
						componentNames={Object.values(COMPONENTS_BY_CATEGORY).flat()}
						isDarkMode={theme === "dark"}
						isMobileMenuOpen={isMobileMenuOpen}
						isMobileSearchOpen={isMobileSearchOpen}
						onIsMobileMenuToggle={toggleIsMobileMenuOpen}
						onIsMobileSearchOpenToggle={toggleIsMobileSearchOpen}
						onSearchComponent={setSelectedComponent}
						onThemeToggle={toggleTheme}
					/>
				</ErrorBoundary>

				<div className="flex pt-16">
					{/* Sidebar */}
					<Sidebar
						activeComponent={selectedComponent}
						componentsByCategory={COMPONENTS_BY_CATEGORY}
						disabled={isManifestLoading}
						isMobileMenuOpen={isMobileMenuOpen}
						onComponentChange={setSelectedComponent}
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

								<DocumentationSection
									className="flex flex-col gap-8 p-8"
									isManifestLoading={isManifestLoading}
									manifest={manifest}
									manifestError={manifestError}
									selectedComponent={selectedComponent}>

									{manifest && (
									<>
										<PropsSection
											className="flex flex-col gap-8"
											manifest={manifest}
											onExtendedComponentClick={setSelectedComponent}
										/>

										<CodeSnippetSection
											className="flex flex-col gap-8"
											manifest={manifest}
										/>

										<PlaygroundSection
											className="flex flex-col gap-8"
											manifest={manifest}
										/>
									</>
									)}

								</DocumentationSection>

							</div>
						</main>
					</ErrorBoundary>
				</div>
			</div>
		</div>
	);
}

export default LookbookLayout;
