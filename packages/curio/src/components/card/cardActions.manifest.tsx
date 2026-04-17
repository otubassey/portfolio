import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import CardActions, { CardActionsProps } from "./cardActions";

const CardActionsComponent = ({ ...props }: CardActionsProps<any>) => (
	<CardActions {...props}>
		<button className="px-4 py-2 bg-gray-200 rounded" type="button">Cancel</button>
		<button className="px-4 py-2 bg-blue-600 text-white rounded" type="submit">Save Changes</button>
	</CardActions>
);

const CardActionsManifest: ComponentManifest<CardActionsProps<any>> = {
	category: ComponentCategory.LAYOUT,
	codeExamples: [
		{
			code: `<CardActions>\n  <Button>Cancel</Button>\n  <Button color="primary">Save Changes</Button>\n</CardActions>`,
			title: "Standard Action Group"
		},
		{
			code: `<CardActions className="justify-end">\n  <IconButton icon="share" />\n  <IconButton icon="heart" />\n</CardActions>`,
			title: "Right-Aligned Actions"
		}
	],
	component: CardActionsComponent,
	description: "A specialized layout container designed to hold action elements (buttons, links, toggles) at the bottom of a Card. Standardizes horizontal alignment and spacing.",
	name: ComponentName.CARD_ACTIONS,
	parameters: [
		{
			control: "none",
			description: "The action elements to be rendered, typically Buttons or IconButtons.",
			name: "children",
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom alignment (e.g., 'justify-end') or padding overrides.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "div",
			description: "The underlying HTML element or React component to render.",
			name: "component",
			options: ManifestUtils.getMappedParameterOptions(["div", "footer"]),
			required: false,
			type: "ElementType"
		}
	],
	status: "stable"
};

export default CardActionsManifest;
