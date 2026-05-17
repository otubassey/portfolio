import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import ListItem, { ListItemProps } from "./listItem";

const ListItemManifest: ComponentManifest<ListItemProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<ListItem button onClick={handleClick}>\n  <ListItemIcon><Icon name="user" /></ListItemIcon>\n  <ListItemText primary="Profile Settings" />\n</ListItem>`,
			title: "Interactive List Item"
		},
		{
			code: `<ListItem divider selected>\n  Active Selection with Divider\n</ListItem>`,
			title: "Selected State with Divider"
		}
	],
	component: ListItem,
	description: "A flexible container for list content. It can function as a plain text entry, a navigation link, or a clickable button, with built-in support for dividers and selection states.",
	name: ComponentName.LIST_ITEM,
	parameters: [
		{
			control: "select",
			defaultValue: "center",
			description: "Aligns the internal flex content vertically. Use 'start' for multi-line text items.",
			name: "alignItems",
			options: ["start", "center"],
			required: false,
			type: "'start' | 'center'"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the item applies hover effects and a pointer cursor, behaving like an interactive element.",
			name: "button",
			required: false,
			type: "boolean"
		},
		{
			control: "readonly",
			description: "The primary content of the list item, often consisting of ListItemText or ListItemIcon components.",
			name: "children",
			required: false,
			type: "ReactNode",
			value: "Item Label"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom padding, font sizing, or color overrides.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, disables interaction and applies a dimmed visual state.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, adds a border to the top and bottom of the item to separate it from neighbors.",
			name: "divider",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Determines if the item is rendered in a highlighted/active state.",
			name: "selected",
			required: false,
			type: "boolean"
		}
	],
	status: "stable"
};

export default ListItemManifest;
