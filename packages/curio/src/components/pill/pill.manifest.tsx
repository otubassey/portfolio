import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import Pill, { PillProps } from "./pill";

const PillManifest: ComponentManifest<PillProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			title: "Themed Success Pill",
			code: `<Pill label="Completed" color="success" icon="check" />`
		},
		{
			title: "Custom Hex Color",
			code: `<Pill label="Custom Color" color="#ff5722" variant="outlined" />`
		},
		{
			title: "Clickable Pill",
			code: `<Pill label="Clickable" onClick={() => alert('Pill clicked!')} />`
		}
	],
	component: Pill,
	description: "A compact element used to represent an input, attribute, or action. Supports theme-based colors, custom hex colors, and leading icons.",
	name: ComponentName.PILL,
	parameters: [
		{
			control: "readonly",
			description: "The text or element to display inside the pill.",
			name: "label",
			required: true,
			type: "ReactNode",
			value: "Status Label"
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
			defaultValue: "default",
			description: "Theme color or a custom hex string.",
			name: "color",
			options: ["default", "primary", "secondary", "success", "warning", "error", "info"],
			required: false,
			type: "'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string"
		},
		{
			control: "select",
			defaultValue: "",
			description: "Optional leading icon name.",
			name: "icon",
			options: ManifestUtils.getIconParameterOptions([
				{name: "check"},
				{name: "close"},
				{name: "search"}
			]),
			required: false,
			type: ManifestUtils.getIconNames()
		},
		{
			control: "none",
			defaultValue: {},
			description: "Props to pass to the icon component.",
			name: "iconProps",
			required: false,
			type: "object"
		},
		{
			control: "select",
			defaultValue: "small",
			description: "The size of the pill.",
			name: "size",
			options: ["small", "medium"],
			required: false,
			type: "'small' | 'medium'"
		},
		{
			control: "select",
			defaultValue: "filled",
			description: "The visual style of the pill.",
			name: "variant",
			options: ["filled", "outlined"],
			required: false,
			type: "'filled' | 'outlined'"
		}
	],
	status: "stable"
};

export default PillManifest;
