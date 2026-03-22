import { JSX } from "react";

import {
	IconName,
	ComponentName
} from "@otuekong-portfolio/design-system";

export const MainPage = {
	LOOKBOOK: "Lookbook",
	PORTFOLIO: "Portfolio"
} as const;

export type MainPageType = typeof MainPage[keyof typeof MainPage];

export const PortfolioPageSection = {
	HOME: "Home",
	PROJECTS: "Projects",
	EXPERIENCE: "Experience",
	SKILLS: "Skills",
	CONTACT: "Contact"
} as const;

export type PortfolioPageSectionName = typeof PortfolioPageSection[keyof typeof PortfolioPageSection];

export const LookbookPageSection = ComponentName;

export type LookbookPageSectionName = typeof LookbookPageSection[keyof typeof LookbookPageSection];

export type MainPageSectionType = PortfolioPageSectionName | LookbookPageSectionName;

export type AppPageDetail =
	| {
		name: typeof MainPage.PORTFOLIO;
		icon: IconName;
		sections: ReadonlyArray<{
			name: PortfolioPageSectionName;
			icon: IconName;
		}>;
	  }
	| {
		name: typeof MainPage.LOOKBOOK;
		icon: IconName;
		sections: ReadonlyArray<{
			name: LookbookPageSectionName;
			icon: IconName;
		}>;
	  };

export interface AppDetail {
	family: string;
	name: string;
	component: JSX.Element | null;
	pageDetails: ReadonlyArray<AppPageDetail>;
	version: string;
}

export type AppDetailsByFamily = Record<string, ReadonlyArray<Omit<AppDetail, "component" | "pageDetails">>>;
