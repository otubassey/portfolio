import { IconName, StatusChipProps } from "@otuekong-portfolio/curio";

import { Technology, TechnologyName } from "../../professional";

export interface Project {
	description: string;
	id: string;
	repositoryUrl: string;
	status: StatusChipProps<any>["status"];
	technologies: Array<TechnologyName>;
	title: string;
	demoUrl?: string;
	icon?: IconName;
}

export const PROJECTS: Array<Project> = [
	{
		id: "project-otuekong-portfolio-system",
		title: "Otuekong Portfolio System",
		description: "Monorepo portfolio meta-system with version switching, showcasing different architectural approaches. Built with Turborepo, featuring dynamic module loading and micro-frontend patterns.",
		repositoryUrl: "portfolio",
		technologies: [
			Technology.HTML,
			Technology.NEXT_JS,
			Technology.REACT,
			Technology.TAILWIND_CSS,
			Technology.TYPESCRIPT
		],
		demoUrl: "",
		icon: "curators-loupe",
		status: "in-progress"
	}
] as const;
