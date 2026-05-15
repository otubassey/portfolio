"use client";

import { useId } from "react";

import {
	BioSection,
	Salutation
} from "@otuekong-portfolio/archives";
import {
	Breadcrumb,
	NavigationList,
	OnNavigateHandler
} from "@otuekong-portfolio/features";

export interface PortfolioViewSidebarProps {
	breadcrumbs: ReadonlyArray<Breadcrumb>;
	onNavigate: OnNavigateHandler;
}

const PortfolioViewSidebar = ({
	breadcrumbs,
	onNavigate
}: PortfolioViewSidebarProps) => {
	const componentId = useId();

	return (
		<>
			<Salutation
				className="p-8"
				id={`desktop-salutation-${componentId}`}
				orientation="vertical"
			/>

			<BioSection
				className="p-8 bg-white dark:bg-gray-800"
				id={`desktop-bio-${componentId}`}
			/>

			<NavigationList
				breadcrumbs={breadcrumbs}
				flatten
				id={`desktop-navigation-${componentId}`}
				listProps={{
					listStyleType: "stretch"
				}}
				onNavigate={onNavigate}
			/>
		</>
	);
};

export default PortfolioViewSidebar;
