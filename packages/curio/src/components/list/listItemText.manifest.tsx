import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import ListItemText, { ListItemTextProps } from "./listItemText";

const ListItemTextManifest: ComponentManifest<ListItemTextProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<ListItemText primary="Main Title" secondary="Additional description text" />`,
			title: "Standard Primary and Secondary Text"
		},
		{
			code: `<ListItemText \n  primary="Alert Level" \n  primaryTextProps={{ color: 'error', weight: 'bold' }} \n/>`,
			title: "Styled Primary Text"
		}
	],
	component: ListItemText,
	description: "A content wrapper for list items that handles the layout and typography of primary labels and secondary descriptions. Automatically applies 'muted' and 'small' styling to secondary content.",
	name: ComponentName.LIST_ITEM_TEXT,
	parameters: [
		{
			control: "readonly",
			description: "The main label or headline content of the list item.",
			name: "primary",
			required: true,
			type: "ReactNode",
			value: "Example Primary Text"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom vertical margins or alignment within the list row.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Configuration properties passed directly to the internal Text component for the primary label.",
			name: "primaryTextProps",
			required: false,
			type: "object"
		},
		{
			control: "select",
			description: "Optional descriptive text or elements displayed beneath the primary content.",
			name: "secondary",
			options: ManifestUtils.getMappedParameterOptions([
				"Additional description text"
			]),
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Configuration properties passed directly to the internal Text component for the secondary description.",
			name: "secondaryTextProps",
			required: false,
			type: "object"
		}
	],
	status: "stable"
};

export default ListItemTextManifest;
