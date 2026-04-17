import {
	List,
	ListItem,
	ListItemButton,
	Typography
} from "@otuekong-portfolio/curio";

import { LookbookPageSectionName } from "../../constants";
import { HELLOWORLD_COMPONENTS_BY_CATEGORY } from "../../registry";

import { OnPageSectionSelectHandler } from "../../features/types";

interface SidebarNavigationProps {
	selectedComponent: LookbookPageSectionName | null;
	onComponentChange: OnPageSectionSelectHandler;
}

function SidebarNavigation({
	selectedComponent,
	onComponentChange
}: SidebarNavigationProps) {
	return (
		<nav className="p-4">
			{/* Component List */}
			<div className="space-y-6">
				{Object.entries(HELLOWORLD_COMPONENTS_BY_CATEGORY).map(([category, components]) => (
				<div key={category}>
					<Typography
						className="font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
						variant="caption">
						{category}
					</Typography>
					<List>
						{components.map((component) => (
							<ListItem key={component}>
								<ListItemButton
									onClick={() => {
										onComponentChange(component);
									}}
									className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
										selectedComponent === component
											? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
											: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
									}`}>
									{component}
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</div>
				))}
			</div>
		</nav>
	);
}

SidebarNavigation.displayName = "SidebarNavigation";

export default SidebarNavigation;
