import { ComponentManifest } from "../types";

import SectionHeading, { SectionHeadingProps } from "./sectionHeading";

const SectionHeadingManifest: ComponentManifest<SectionHeadingProps> = {
	category: "Layout",
	codeExamples: [
		{
			code: `<SectionHeading heading="Analytics Dashboard" subtitle="Real-time data for your application." />`,
			title: "Standard Heading Pair"
		}
	],
	component: SectionHeading,
	description: "An internal layout utility that renders a consistent heading and subtitle pair with intelligent string-to-typography conversion.",
	name: "SectionHeading",
	parameters: [
		{
			control: "select",
			description: "The main heading content. Strings are automatically wrapped in a Heading component.",
			name: "heading",
			options: [
				{label: "String Heading", value: "Section Title"},
				{label: "Custom ReactNode", value: <><span className="text-blue-500">Custom</span> Heading</>},
				{label: "None", value: null}
			],
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Custom props for the internal Heading element (e.g., color, weight).",
			name: "headingProps",
			required: false,
			type: "object"
		},
		{
			control: "select",
			description: "Optional descriptive text. Strings are automatically wrapped in muted body1 Typography.",
			name: "subtitle",
			options: [
				{label: "String Subtitle", value: "This is a subtitle providing additional context for the section."},
				{label: "Custom ReactNode", value: <span className="text-gray-500">Custom Subtitle</span>},
				{label: "None", value: null}
			],
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Custom props for the internal subtitle Typography element.",
			name: "subtitleProps",
			required: false,
			type: "object"
		}
	],
	status: "unstable"
};

export default SectionHeadingManifest;
