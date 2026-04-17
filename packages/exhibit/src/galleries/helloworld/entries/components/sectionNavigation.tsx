import React, { memo } from "react";

import { CssUtils, List, ListItem, ListItemText } from "@otuekong-portfolio/curio";

import { PortfolioPageSectionName, PortfolioPageSection } from "../../constants";

import { OnPageSectionSelectHandler } from "../types";

const NAV_ITEMS = Object.values(PortfolioPageSection) as ReadonlyArray<PortfolioPageSectionName>;

export interface SectionNavigationProps {
	activeSection?: PortfolioPageSectionName | null;
	className?: string;
	id?: string;
	onClick?: OnPageSectionSelectHandler;
}

function SectionNavigation({
	activeSection = null,
	className,
	id,
	onClick
}: SectionNavigationProps) {
	return (
		<List
			className={CssUtils.mergeClasses("p-8", className)}
			id={id}
			listStyleType="stretch">
			{NAV_ITEMS.map(navItem => (
				<ListItem
					key={navItem}
					button
					onClick={() => onClick?.(navItem)}
					selected={activeSection === navItem}>
					<ListItemText primary={navItem} />
				</ListItem>
			))}
		</List>
	);
}

SectionNavigation.displayName = "SectionNavigation";

export default memo(SectionNavigation);
