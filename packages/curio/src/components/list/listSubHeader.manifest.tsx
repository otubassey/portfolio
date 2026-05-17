import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import ListSubHeader, { ListSubHeaderProps } from "./listSubHeader";

const ListSubHeaderManifest: ComponentManifest<ListSubHeaderProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<ListSubHeader>System Settings</ListSubHeader>`,
			title: "Standard Group Header"
		},
		{
			code: `<ListSubHeader color="primary" divider>\n  Recently Accessed\n</ListSubHeader>`,
			title: "Themed Header with Divider"
		},
		{
			code: `<ListSubHeader disableSticky>\n  Static Section Label\n</ListSubHeader>`,
			title: "Non-Sticky Header"
		}
	],
	component: ListSubHeader,
	description: "A specialized list item used to label a group of related items. Features uppercase tracking for visual hierarchy and sticky positioning to keep category context visible during scrolling.",
	name: ComponentName.LIST_SUB_HEADER,
	parameters: [
		{
			control: "readonly",
			description: "The label text or content displayed as the section header.",
			name: "children",
			required: true,
			type: "ReactNode",
			value: "Example Subheader"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom vertical padding or font adjustments.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "default",
			description: "Sets the text and background color theme for the header.",
			name: "color",
			options: ["default", "primary", "inherit"],
			required: false,
			type: "'default' | 'primary' | 'inherit'"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the header remains in its static position rather than sticking to the top of the list during scroll.",
			name: "disableSticky",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, adds a subtle bottom border to clearly separate the header from the items below.",
			name: "divider",
			required: false,
			type: "boolean"
		}
	],
	status: "stable"
};

export default ListSubHeaderManifest;
