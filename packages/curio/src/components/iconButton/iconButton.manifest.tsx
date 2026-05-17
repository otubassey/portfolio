import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import IconButton, { IconButtonProps } from "./iconButton";

// TODO: color and variant not working in lookbook - fix
// Should these also apply to component?
const IconButtonManifest: ComponentManifest<IconButtonProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<IconButton icon="search" variant="ghost" aria-label="Search" />`,
			title: "Standard Ghost Search"
		},
		{
			code: `<IconButton icon="close" variant="filled" size="medium" />`,
			title: "Medium Filled Close Button"
		}
	],
	component: IconButton,
	description: "A compact, circular button component designed specifically for icons, supporting various visual variants and consistent sizing.",
	extends: [
		ComponentName.BUTTON
	],
	name: ComponentName.ICON_BUTTON,
	parameters: [
		{
			control: "select",
			description: "The custom content to be rendered inside the button. Overrides the icon prop.",
			name: "children",
			options: ManifestUtils.getIconParameterOptions([
				{name: "check", asElement: true},
				{name: "close", asElement: true}
			]),
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for the button.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			description: "The color theme of the button.",
			name: "color",
			options: ManifestUtils.getMappedParameterOptions([
				"primary",
				"secondary",
				"success",
				"error",
				"warning",
				"info",
				"inherit"
			]),
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "button",
			description: "The underlying HTML element or React component to render.",
			name: "component",
			options: ManifestUtils.getMappedParameterOptions(["a", "button", "div", "span"]),
			required: false,
			type: "ElementType"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, prevents user interaction and applies disabled styles.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "The name of the icon to render or a custom ReactNode.",
			name: "icon",
			options: ManifestUtils.getIconParameterOptions([
				{name: "check"},
				{name: "close", asElement: true, label: "close (as element)"},
				{name: "search"}
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "none",
			defaultValue: {},
			description: "Additional props passed specifically to the icon wrapper.",
			name: "iconProps",
			required: false,
			type: "object"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, displays a loading spinner instead of the icon.",
			name: "loading",
			required: false,
			type: "boolean"
		},
		{
			control: "none",
			description: "Callback fired when the button is clicked.",
			name: "onClick",
			required: false,
			type: "function"
		},
		{
			control: "select",
			defaultValue: "small",
			description: "The scale of the button and its internal padding.",
			name: "size",
			options: ["small", "medium", "large"],
			required: false,
			type: "'small' | 'medium' | 'large'"
		},
		{
			control: "select",
			defaultValue: "ghost",
			description: "The visual style of the button track.",
			name: "variant",
			options: ["ghost", "filled", "outlined"],
			required: false,
			type: "'ghost' | 'filled' | 'outlined'"
		}
	],
	status: "unstable"
};

export default IconButtonManifest;
