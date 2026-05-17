"use client";

import { ReactNode } from "react";

import { ErrorBoundary, useTheme } from "@otuekong-portfolio/curio";

import { useNavigation } from "../../navigation";

import DesktopHeader from "./desktopHeader";
import MobileHeader from "./mobileHeader";

export interface GalleryHeaderProps {
	children?: ReactNode;
}

function GalleryHeader({
	children
}: GalleryHeaderProps) {
	const {
		breadcrumbs,
		isMobileMenuOpen,
		onNavigate,
		toggleIsMobileMenuOpen,
	} = useNavigation();

	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<ErrorBoundary>
			<DesktopHeader
				breadcrumbs={breadcrumbs}
				children={children}
				className="border-b border-gray-200 dark:border-gray-700 bg-ps-surface"
				isDarkMode={isDarkMode}
				onBreadcrumbSelect={onNavigate}
				onToggleTheme={toggleTheme}
			/>

			<MobileHeader
				breadcrumbs={breadcrumbs}
				children={children}
				className="border-b border-gray-200 dark:border-gray-700 bg-ps-surface z-ps-appbar"
				isDarkMode={isDarkMode}
				isMenuOpen={isMobileMenuOpen}
				onBreadcrumbSelect={onNavigate}
				onToggleTheme={toggleTheme}
				toggleIsMenuOpen={toggleIsMobileMenuOpen}
			/>
		</ErrorBoundary>
	);
}

export default GalleryHeader;
