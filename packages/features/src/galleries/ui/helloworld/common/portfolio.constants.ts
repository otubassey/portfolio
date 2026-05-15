import { AppBlueprint } from "../../../applicationContext";

export const PortfolioSubViewName = {
	HOME: "Home",
	PROJECTS: "Projects",
	EXPERIENCE: "Experience",
	SKILLS: "Skills",
	CONTACT: "Contact"
} as const;

export const PORTFOLIO_BLUEPRINT: AppBlueprint = {
	name: "Portfolio",
	icon: "building",
	hide: false,
	sections: [
		{
			name: PortfolioSubViewName.HOME,
			icon: "home"
		},
		{
			name: PortfolioSubViewName.EXPERIENCE,
			icon: "briefcase"
		},
		{
			name: PortfolioSubViewName.PROJECTS,
			icon: "code"
		},
		{
			name: PortfolioSubViewName.SKILLS,
			icon: "award"
		},
		{
			name: PortfolioSubViewName.CONTACT,
			icon: "mail"
		}
	]
} as const;
