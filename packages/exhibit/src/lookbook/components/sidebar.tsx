"use client";

import {
	CssUtils,
	ErrorBoundary,
	List,
	ListItem,
	ListItemButton,
	Typography
} from "@otuekong-portfolio/curio";

interface SidebarProps {
	activeComponent: string | null;
	componentsByCategory: Record<string, Array<string>>;
	disabled: boolean;
	isMobileMenuOpen: boolean;
	onComponentChange: (component: string) => void;
	onIsMobileMenuToggle: (open: boolean) => void;
	className?: string;
	overlay?: boolean;
}

function Sidebar({
	activeComponent,
	componentsByCategory,
	disabled = false,
	isMobileMenuOpen,
	onComponentChange,
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
						{Object.entries(componentsByCategory).map(([category, components]) => (
						<div key={category}>
							<Typography
								className="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
								variant="caption">
								{category}
							</Typography>
							<List>
								{components.map((component) => (
									<ListItem key={component} disabled={disabled}>
										<ListItemButton
											className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
												activeComponent === component
													? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
													: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
											}`}
											disabled={disabled}
											onClick={() => {
												onComponentChange(component);
												onIsMobileMenuToggle(false);
											}}>
											{component}
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</div>
						))}
					</div>
				</nav>
			</aside>
		</ErrorBoundary>
	);
}

Sidebar.displayName = "Sidebar";

export default Sidebar;
