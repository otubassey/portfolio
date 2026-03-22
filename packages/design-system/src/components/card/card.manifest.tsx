import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import Card, { CardProps } from "./card";

const CardComponent = ({ ...props}: CardProps) => (
	<Card {...props} className="p-4">
		<div className="mb-2 text-lg font-semibold">Card Title</div>
		<div className="text-sm text-gray-600">This is an example of a card component.</div>
	</Card>
);

const CardManifest: ComponentManifest<CardProps<any>> = {
	category: ComponentCategory.LAYOUT,
	codeExamples: [
		{
			code: `<Card raised className="p-4">\n  <Typography variant="h6">Featured Content</Typography>\n  <Text>This card uses the raised prop for emphasis.</Text>\n</Card>`,
			title: "Raised Action Card"
		},
		{
			code: `<Card outlined elevation={0}>\n  Flat bordered card content\n</Card>`,
			title: "Outlined Flat Card"
		}
	],
	component: CardComponent,
	description: "An extension of the Surface component that represents a self-contained piece of content. Includes a 'raised' state for visual prominence and interaction feedback.",
	extends: [
		ComponentName.SURFACE
	],
	name: ComponentName.CARD,
	parameters: [
		{
			control: "none",
			description: "The content to be rendered within the card container.",
			name: "children",
			required: false,
			type: "ReactNode"
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
			defaultValue: "div",
			description: "The underlying HTML element or React component to render.",
			name: "component",
			options: ManifestUtils.getMappedParameterOptions(["article", "div", "section"]),
			required: false,
			type: "ElementType"
		},
		{
			control: "select",
			defaultValue: 1,
			description: "Determines shadow depth (0-6). If 'raised' is true, this defaults to 4; otherwise defaults to 1.",
			name: "elevation",
			options: ManifestUtils.getMappedParameterOptions(["0", "1", "2", "3", "4", "5", "6"]),
			required: false,
			type: "0 | 1 | 2 | 3 | 4 | 5 | 6"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, renders a border around the card.",
			name: "outlined",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, increases elevation and applies a subtle scale and translate-y transform for emphasis.",
			name: "raised",
			required: false,
			type: "boolean"
		}
	],
	status: "stable"
};

export default CardManifest;
