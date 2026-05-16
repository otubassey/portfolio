import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import Badge, { BadgeProps } from "./badge";

const BadgeManifest: ComponentManifest<BadgeProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			title: "Professional Experience Badge",
			code: `<Badge \n  elevation={5} \n  pill \n  className="gap-4 px-8 py-5 border border-gray-200 dark:border-blue-500/20"\n>\n  <Typography variant="h4" weight="bold" color="primary">10</Typography>\n  <div className="border-l pl-6">\n    <Typography variant="subtitle1" weight="bold">Years</Typography>\n    <Text size="small" muted>Experience</Text>\n  </div>\n</Badge>`
		},
		{
			title: "Status Indicator",
			code: `<Badge \n  shade="light" \n  className="px-4 py-2 gap-2 border border-emerald-500/30"\n>\n  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />\n  <Typography variant="caption" weight="bold">System Operational</Typography>\n</Badge>`
		},
		{
			title: "Flat Document Label",
			code: `<Badge \n  elevation={0} \n  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 border"\n>\n  <Typography variant="overline" weight="semibold">v1.2.4-stable</Typography>\n</Badge>`
		}
	],
	component: Badge,
	description: "A versatile structural container used to highlight key metrics, statuses, or labels. It extends the Surface foundation to provide a consistent visual language for elevation and themed backgrounds while allowing full internal layout flexibility.",
	extends: [
		ComponentName.SURFACE
	],
	name: ComponentName.BADGE,
	parameters: [
		{
			control: "readonly",
			description: "The primary content to be rendered inside the badge. Supports flexible layouts including icons, typography stacks, or custom numeric displays.",
			name: "children",
			required: false,
			type: "ReactNode",
			value: "Content inside the surface container"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for padding, dimensions, or layout.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: 1,
			description: "Determines the shadow depth using a scale from 0 (flat) to 6 (deepest). Maps to Tailwind shadow utilities.",
			name: "elevation",
			options: [
				{ label: "0 (flat)", value: 0 },
				{ label: "1", value: 1 },
				{ label: "2", value: 2 },
				{ label: "3", value: 3 },
				{ label: "4", value: 4 },
				{ label: "5", value: 5 },
				{ label: "6", value: 6 },
				{ label: "7 (Invalid value)", value: 7 }
			],
			required: false,
			type: "0 | 1 | 2 | 3 | 4 | 5 | 6"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, adds 'rounded-2xl' to the corners otherwise 'rounded-xl'.",
			name: "rounded",
			required: false,
			type: "boolean"
		}
	],
	status: "unstable"
};

export default BadgeManifest;
