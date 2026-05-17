import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import List, { ListProps } from "./list";
import ListItem from "./listItem";

const ListComponent = ({ ...props }: ListProps) => {
	return (
		<List {...props}>
			<li>Vanilla li element</li>
			<ListItem>Custom ListItem component</ListItem>
		</List>
	);
};

const ListManifest: ComponentManifest<ListProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<List listStyleType="disc" listStylePosition="inside">\n  <ListItem>First item</ListItem>\n  <ListItem>Second item</ListItem>\n</List>`,
			title: "Standard Bulleted List"
		},
		{
			code: `<List component="ol" listStyleType="decimal">\n  <ListItem>Step One</ListItem>\n  <ListItem>Step Two</ListItem>\n</List>`,
			title: "Ordered Numbered List"
		}
	],
	component: ListComponent,
	description: "A flexible list container that manages bullet types, numbering, and alignment. It uses a context provider to ensure nested ListItems inherit the correct layout logic.",
	name: ComponentName.LIST,
	parameters: [
		{
			control: "none",
			description: "The collection of ListItem or ListSubHeader components to be rendered.",
			name: "children",
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom spacing, borders, or colors.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "ul",
			description: "The underlying HTML element to render (e.g., 'ul', 'ol', 'nav').",
			name: "component",
			options: ["ul", "ol", "nav"],
			required: false,
			type: "ElementType"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the list container expands to fill the full width of its parent.",
			name: "fullWidth",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			defaultValue: "outside",
			description: "Controls whether the list marker sits inside the content flow or in the margin.",
			name: "listStylePosition",
			options: ["inside", "outside"],
			required: false,
			type: "'inside' | 'outside'"
		},
		{
			control: "select",
			defaultValue: "none",
			description: "Determines the marker style (bullets, numbers, or custom shapes). Use 'inherit' to allow browser or parent style defaults.",
			name: "listStyleType",
			options: ["circle", "decimal", "disc", "inherit", "none", "square", "stretch"],
			required: false,
			type: "'circle' | 'decimal' | 'disc' | 'inherit' | 'none' | 'square' | 'stretch'"
		}
	],
	status: "stable"
};

export default ListManifest;
