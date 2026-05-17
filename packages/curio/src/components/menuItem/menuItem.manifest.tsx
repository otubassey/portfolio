import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { MenuProvider } from "../menu";
import { ComponentManifest } from "../types";

import MenuItem, { MenuItemProps } from "./menuItem";

const MenuItemComponent = ({ ...props }: MenuItemProps) => {
	return (
		<MenuProvider
			menuId={"menu-item-example-id"}
			onChange={() => {}}
			onHighlightedIndexChange={() => {}}>

			<MenuItem {...props} />

		</MenuProvider>
	);
};

const MenuItemManifest: ComponentManifest<MenuItemProps> = {
	category: ComponentCategory.NAVIGATION,
	codeExamples: [
		{
			code: `<MenuItem value="profile" startIcon="user">Profile Settings</MenuItem>`,
			title: "Standard Item with Icon"
		},
		{
			code: `<MenuItem value="delete" divider selected>Current Selection</MenuItem>`,
			title: "Selected Item with Divider"
		}
	],
	component: MenuItemComponent,
	description: "An actionable item within a Menu or Dropdown, supporting icons, selection states, and keyboard navigation roles.",
	name: ComponentName.MENU_ITEM,
	parameters: [
		{
			control: "readonly",
			description: "The primary label or content displayed within the menu item.",
			name: "children",
			required: true,
			type: "ReactNode",
			value: "Menu Option"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the item will be automatically focused when the menu opens.",
			name: "autoFocus",
			required: false,
			type: "boolean"
		},
		{
			control: "none",
			description: "Additional CSS class names to apply to the menu item for custom styling.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the item is visually dimmed and interaction is disabled.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Adds a bottom border divider to visually separate items or groups.",
			name: "divider",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "The name of the icon to display at the end of the item.",
			name: "endIcon",
			options: ManifestUtils.getIconParameterOptions([
				{ name: "chevron-down" },
				{ name: "chevron-up" },
				{ name: "info", asElement: true, label: "Info (Element)" }
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "readonly",
			description: "The index of the item within its parent container.",
			name: "index",
			required: false,
			type: "number",
			value: 10
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Manually forces the item into a selected visual state.",
			name: "selected",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "The name of the icon to display at the start of the item.",
			name: "startIcon",
			options: ManifestUtils.getIconParameterOptions([
				{ name: "chevron-down", asElement: true, label: "Chevron Down (Element)" },
				{ name: "chevron-up" },
				{ name: "info" }
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "readonly",
			description: "The unique identifier associated with this item, typically used for selection logic.",
			name: "value",
			required: false,
			type: "any",
			value: "Menu Option"
		}
	],
	status: "unstable"
};

export default MenuItemManifest;
