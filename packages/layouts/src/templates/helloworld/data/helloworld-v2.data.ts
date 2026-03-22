import { ComponentName } from "@otuekong-portfolio/design-system";

import { AppDetail } from "../constants";

export const APP_DETAILS: Array<AppDetail> = [
	{
		family: "Helloworld",
		name: "Helloworld-v2",
		component: null,
		pageDetails: [
			{
				name: "Portfolio",
				icon: "building",
				sections: [
					{
						name: "Home",
						icon: "home"
					},
					{
						name: "Experience",
						icon: "briefcase"
					},
					{
						name: "Projects",
						icon: "code"
					},
					{
						name: "Skills",
						icon: "award"
					},
					{
						name: "Contact",
						icon: "mail"
					}
				]
			},
			{
				name: "Lookbook",
				icon: "palette",
				sections: [
					{
						name: ComponentName.ALERT,
						icon: "puzzle-piece"
					},
					{
						name: ComponentName.BACKDROP,
						icon: "puzzle-piece"
					},
					{
						name: ComponentName.BUTTON,
						icon: "puzzle-piece"
					},
					{
						name: ComponentName.BUTTON_BASE,
						icon: "puzzle-piece"
					},
				]
			}
		],
		version: "v2"
	}
] as const;
