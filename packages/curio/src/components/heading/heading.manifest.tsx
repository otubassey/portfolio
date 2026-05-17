import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import Heading, { HeadingProps } from "./heading";

const HeadingManifest: ComponentManifest<HeadingProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<Heading level={1}>Main Page Title</Heading>`,
			title: "Explicit Level Heading"
		},
		{
			code: `<Heading color="primary" weight="bold">Context-Aware Heading</Heading>`,
			title: "Themed Subheading"
		}
	],
	component: Heading,
	description: "A semantic typography wrapper that renders h1-h6 elements. It automatically determines its hierarchy level via context or an explicit override prop.",
	extends: [
		ComponentName.TYPOGRAPHY
	],
	name: ComponentName.HEADING,
	parameters: [
		{
			control: "none",
			description: "The text content or elements to be displayed as the heading.",
			name: "children",
			required: true,
			type: "ReactNode",
			value: "Heading Text"
		},
		{
			control: "select",
			description: "Explicitly sets the heading level (1-6). If omitted, it inherits the level from the nearest HeadingLevel context.",
			name: "level",
			options: [
				{ label: "1", value: 1 },
				{ label: "2", value: 2 },
				{ label: "3", value: 3 },
				{ label: "4", value: 4 },
				{ label: "5", value: 5 },
				{ label: "6", value: 6 },
				{ label: "None (inherit from context)", value: undefined }
			],
			required: false,
			type: "1 | 2 | 3 | 4 | 5 | 6"
		}
	],
	status: "unstable"
};

export default HeadingManifest;
