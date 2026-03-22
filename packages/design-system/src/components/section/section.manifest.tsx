import { ComponentCategory, ComponentName } from "../../constants";
import { ComponentManifest } from "../types";

import Section, { SectionProps } from "./section";

// TODO: raised and rounded not visible in dark mode - fix
const SectionManifest: ComponentManifest<SectionProps> = {
	category: ComponentCategory.LAYOUT,
	codeExamples: [
		{
			code: `<Section heading="User Profile" subtitle="Manage your account settings" raised rounded>\n  <ProfileForm />\n</Section>`,
			title: "Raised Rounded Section"
		}
	],
	component: Section,
	description: "A content container that automatically manages accessibility labels, heading levels, and provides an imperative scroll handle.",
	extends: [
		ComponentName.SURFACE
	],
	name: ComponentName.SECTION,
	parameters: [
		{
			control: "select",
			description: "The content to be displayed within the section.",
			name: "children",
			options: [
				{label: "Custom ReactNode", value: <div className="p-4 bg-gray-50 dark:bg-gray-700"><p className="text-sm text-gray-700 dark:text-gray-300">This is a custom content area inside the section.</p></div>},
				{label: "None", value: null}
			],
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom styling and layout overrides.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			description: "The primary title of the section. Pass a string for automatic heading level handling or a ReactNode for custom content.",
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
			description: "Configuration properties passed directly to the internal Heading component.",
			name: "headingProps",
			required: false,
			type: "object"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, applies a shadow elevation (depth) to the section surface.",
			name: "raised",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Determines if the section surface has rounded corners or square edges.",
			name: "rounded",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "Optional secondary text or component displayed beneath the heading.",
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
			description: "Configuration properties passed directly to the internal Typography component for the subtitle.",
			name: "subtitleProps",
			required: false,
			type: "object"
		}
	],
	status: "unstable"
};

export default SectionManifest;
