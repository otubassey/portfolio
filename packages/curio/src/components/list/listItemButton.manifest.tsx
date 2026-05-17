import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import ListItemButton, { ListItemButtonProps } from "./listItemButton";

const ListItemButtonManifest: ComponentManifest<ListItemButtonProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<ListItemButton \n  startIcon="user" \n  onClick={() => navigate('/profile')}\n>\n  Profile Settings\n</ListItemButton>`,
			title: "Navigation List Button"
		},
		{
			code: `<ListItemButton \n  selected \n  color="primary" \n  endIcon="check"\n>\n  Selected Option\n</ListItemButton>`,
			title: "Selected Action State"
		}
	],
	component: ListItemButton,
	description: "An interactive list element built on ButtonBase. Optimized for menu-like interactions with support for start/end icons, selection states, and keyboard accessibility.",
	extends: [
		ComponentName.BUTTON_BASE
	],
	name: ComponentName.LIST_ITEM_BUTTON,
	parameters: [
		{
			control: "readonly",
			description: "The primary label or content displayed between the optional start and end icons.",
			name: "children",
			required: true,
			type: "ReactNode",
			value: "Item Label"
		},
		{
			control: "select",
			defaultValue: "center",
			description: "Determines the vertical alignment of the icons and text content.",
			name: "alignItems",
			options: ["center", "start"],
			required: false,
			type: "'center' | 'start'"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom padding or color overrides.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "inherit",
			description: "Sets the color theme for the text and hover background states.",
			name: "color",
			options: ["primary", "secondary", "inherit"],
			required: false,
			type: "'primary' | 'secondary' | 'inherit'"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, disables all interactions and applies a dimmed visual state.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, renders a subtle bottom border to separate items in a list.",
			name: "divider",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "An icon or element displayed to the right of the text content.",
			name: "endIcon",
			options: ManifestUtils.getIconParameterOptions([
				{name: "chevron-down"},
				{name: "check", asElement: true, label: "Check (element)"},
				{name: "close"}
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the button expands to fill the full width of its container.",
			name: "fullWidth",
			required: false,
			type: "boolean"
		},
		{
			control: "none",
			description: "Callback function executed when the button is clicked or activated via keyboard (Enter/Space).",
			name: "onClick",
			required: false,
			type: "function"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Applies a highlighted visual style to indicate the item is currently active or chosen.",
			name: "selected",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			defaultValue: "medium",
			description: "Sets the vertical padding and the size of the internal icons.",
			name: "size",
			options: ["small", "medium", "large"],
			required: false,
			type: "'small' | 'medium' | 'large'"
		},
		{
			control: "select",
			description: "An icon or element displayed to the left of the text content.",
			name: "startIcon",
			options: ManifestUtils.getIconParameterOptions([
				{name: "chevron-down", asElement: true, label: "Chevron Down (element)"},
				{name: "check"},
				{name: "close"}
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		}
	],
	status: "stable"
};

export default ListItemButtonManifest;
