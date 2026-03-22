import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import ListItemIcon, { ListItemIconProps } from "./listItemIcon";

const ListItemIconManifest: ComponentManifest<ListItemIconProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<ListItemIcon icon="user" />`,
			title: "Standard Library Icon"
		},
		{
			code: `<ListItemIcon>\n  <Icon name="mail" color="primary" />\n</ListItemIcon>`,
			title: "Custom Icon Child"
		}
	],
	component: ListItemIcon,
	description: "A structural wrapper for icons within a ListItem. It provides consistent minimum width and alignment to ensure icons remain visually balanced when used alongside text.",
	extends: [
		// TODO: implement omitted props: for example, with the below, name prop is replaced by icon prop, and ref is forwarded to the div wrapper instead of the Icon component, so we should clarify these differences in the documentation and potentially adjust the manifest structure to better represent these nuances.
		ComponentName.ICON
	],
	name: ComponentName.LIST_ITEM_ICON,
	parameters: [
		{
			control: "select",
			description: "The name of the library icon or a custom React element to be rendered.",
			name: "icon",
			options: ManifestUtils.getIconParameterOptions([
				{ name: "mail", asElement: true, label: "Mail Icon (as React element)" },
				{ name: "close" },
				{ name: "search", asElement: true, label: "Search Icon (as React element)" }
			]),
			required: true,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "select",
			description: "Custom React elements to render inside the icon container. Overrides the 'icon' prop if both are provided.",
			name: "children",
			options: ManifestUtils.getIconParameterOptions([
				{ name: "mail" },
				{ name: "close" },
				{ name: "search", asElement: true, label: "Search Icon (as React element)" }
			]),
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom spacing or color overrides.",
			name: "className",
			required: false,
			type: "string"
		}
	],
	status: "stable"
};

export default ListItemIconManifest;
