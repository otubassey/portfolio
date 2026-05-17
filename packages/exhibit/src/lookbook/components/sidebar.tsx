"use client";

import {
	COMPONENTS_BY_CATEGORY,
	CssUtils,
	ErrorBoundary
} from "@otuekong-portfolio/curio";
import { Breadcrumb, NavigationList, OnNavigateHandler } from "@otuekong-portfolio/features";

interface SidebarProps {
	breadcrumbs: ReadonlyArray<Breadcrumb>;
	disabled: boolean;
	isMobileMenuOpen: boolean;
	onComponentClick: OnNavigateHandler;
	onIsMobileMenuToggle: (open: boolean) => void;
	className?: string;
	overlay?: boolean;
}

function Sidebar({
	breadcrumbs,
	disabled = false,
	isMobileMenuOpen,
	onComponentClick,
	onIsMobileMenuToggle,
	className = "",
	overlay = false
}: SidebarProps) {
	return (
		<ErrorBoundary>
			<aside
				className={CssUtils.mergeClasses(
					"fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800",
					"border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-transform duration-300",
					!overlay ? "z-ps-sidebar-clipped" : "z-ps-sidebar-main",
					isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
					className
				)}>
				<nav className="p-4">
					{/* Component List */}
					<div className="space-y-6">
						<NavigationList
							breadcrumbs={breadcrumbs}
							disabled={disabled}
							registry={COMPONENTS_BY_CATEGORY}
							onNavigate={(selectedComponent) => {
								onComponentClick(selectedComponent);
								onIsMobileMenuToggle(false);
							}}
						/>
					</div>
				</nav>
			</aside>
		</ErrorBoundary>
	);
}

Sidebar.displayName = "Sidebar";

export default Sidebar;
