import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import CardHeader, { CardHeaderProps } from "./cardHeader";

const CardHeaderManifest: ComponentManifest<CardHeaderProps> = {
	category: ComponentCategory.LAYOUT,
	codeExamples: [
		{
			code: `<CardHeader title="Project Overview" />`,
			title: "Simple Title Header"
		},
		{
			code: `<CardHeader \n  title="Settings" \n  headingProps={{ variant: 'h5', color: 'primary' }} \n/>`,
			title: "Header with Heading Overrides"
		},
		{
			code: `<CardHeader className="flex-row justify-between items-center">\n  <Heading>Statistics</Heading>\n  <InputIcon icon="more-vertical" />\n</CardHeader>`,
			title: "Custom Content Header"
		}
	],
	component: CardHeader,
	description: "The top-level container for a Card. Automatically converts 'title' or string children into a Heading component while supporting custom layout elements.",
	name: ComponentName.CARD_HEADER,
	parameters: [
		{
			control: "select",
			description: "Alternative way to pass title text or custom elements. If a string is provided, it is wrapped in a Heading.",
			name: "children",
			options: [
				{ label: "Statistics", value: "Statistics" },
				{ label: "Custom ReactNode", value: <span className="text-blue-500">Custom ReactNode</span> },
				{ label: "None", value: "" }
			],
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom padding, flex-direction, or background styling.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Configuration properties passed directly to the internal Heading component when a title string is used.",
			name: "headingProps",
			required: false,
			type: "object"
		},
		{
			control: "select",
			description: "The primary title text or custom React elements to display at the top of the card.",
			name: "title",
			options: [
				{ label: "Project Overview", value: "Project Overview" },
				{ label: "None", value: "" }
			],
			required: false,
			type: "string"
		}
	],
	status: "stable"
};

export default CardHeaderManifest;
