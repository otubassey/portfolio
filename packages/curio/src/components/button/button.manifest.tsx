import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import Button from "./button";

const ButtonManifest: ComponentManifest = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			title: "Basic Usage",
			code: `<Button variant="contained" color="primary">Click Me</Button>`
		},
		{
			title: "With Icon name",
			code: `<Button startIcon="download">Download Report</Button>`
		},
		{
			title: "With Icon component",
			code: `<Button startIcon={<Icon name="download" />}>Download Report</Button>`
		}
	],
	component: Button,
	description: "A versatile button component with multiple variants, sizes, and icon support.",
	extends: [
		ComponentName.BUTTON_BASE
	],
	name: ComponentName.BUTTON,
	parameters: [
		{
			control: "readonly",
			description: "The content of the button.",
			name: "children",
			required: false,
			type: "ReactNode",
			value: "Click Me"
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
			defaultValue: "primary",
			description: "The theme color applied to the variant.",
			name: "color",
			options: ["primary", "secondary", "inherit", "error", "warning", "success", "info"],
			required: false,
			type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit'"
		},
		{
			control: "select",
			defaultValue: "button",
			description: "The underlying HTML element or React component to render.",
			name: "component",
			options: ["a", "button", "div", "span"],
			required: false,
			type: "ElementType"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the component is disabled.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "The icon displayed at the end of the button. Can be an IconName or a custom ReactNode.",
			name: "endIcon",
			options: ManifestUtils.getIconParameterOptions([
				{name: "chevron-down"},
				{name: "close", asElement: true, label: "close (as element)"},
				{name: "check"}
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "none",
			defaultValue: {},
			description: "Props for the end icon component.",
			name: "endIconProps",
			required: false,
			type: "object"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the component takes up the full width of its container.",
			name: "fullWidth",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			defaultValue: "center",
			description: "The justification of the button's content when the button is fullWidth.",
			name: "justify",
			options: ["around", "between", "center", "end", "start"],
			required: false,
			type: "'around' | 'between' | 'center' | 'end' | 'start'"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, shows a spinner and disables interaction.",
			name: "loading",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			defaultValue: "medium",
			description: "The size of the button.",
			name: "size",
			options: ["small", "medium", "large"],
			required: false,
			type: "'small' | 'medium' | 'large'"
		},
		{
			control: "select",
			description: "The icon displayed at the start of the button. Can be an IconName or a custom ReactNode.",
			name: "startIcon",
			options: ManifestUtils.getIconParameterOptions([
				{name: "chevron-down"},
				{name: "check", asElement: true, label: "check (as element)"},
				{name: "close"}
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "none",
			defaultValue: {},
			description: "Props for the start icon component.",
			name: "startIconProps",
			required: false,
			type: "object"
		},
		{
			control: "select",
			defaultValue: "uppercase",
			description: "The text transform of the button.",
			name: "textTransform",
			options: ["none", "lowercase", "uppercase"],
			required: false,
			type: "'none' | 'lowercase' | 'uppercase'"
		},
		{
			control: "select",
			defaultValue: "button",
			description: "The HTML button type attribute.",
			name: "type",
			options: ["button", "reset", "submit"],
			required: false,
			type: "'button' | 'submit' | 'reset'"
		},
		{
			control: "select",
			defaultValue: "contained",
			description: "The visual style of the button.",
			name: "variant",
			options: ["contained", "outlined", "text"],
			required: false,
			type: "'contained' | 'outlined' | 'text'"
		}
	],
	status: "unstable"
};

export default ButtonManifest;
