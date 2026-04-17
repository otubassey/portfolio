import { AppDetail } from "../constants";

export const APP_DETAILS: Array<AppDetail> = [
	{
		family: "Helloworld",
		name: "Helloworld-v1",
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
			}
		],
		version: "v1"
	}
] as const;
