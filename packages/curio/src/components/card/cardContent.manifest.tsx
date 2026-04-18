import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import CardContent, { CardContentProps } from "./cardContent";

const CardContentComponent = ({ ...props }: CardContentProps<any>) => (
	<CardContent {...props}>
		<p>This is the main body of the card. It can contain text, typography components, or any custom content.</p>
	</CardContent>
);

const CardContentManifest: ComponentManifest<CardContentProps<any>> = {
	category: ComponentCategory.LAYOUT,
	codeExamples: [
		{
			code: `<CardContent>\n  <Typography variant="body1">This is the main body of the card.</Typography>\n</CardContent>`,
			title: "Standard Content Body"
		}
	],
	component: CardContentComponent,
	description: "The primary content container for a Card. It applies standardized line-height and theme-aware text colors to its children.",
	name: ComponentName.CARD_CONTENT,
	parameters: [
		{
			control: "none",
			description: "The content (text, typography, or custom components) to be rendered within the card body.",
			name: "children",
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom padding, height, or typography overrides.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "div",
			description: "The underlying HTML element or React component used to render the content container.",
			name: "component",
			options: ManifestUtils.getMappedParameterOptions(["div", "article", "section"]),
			required: false,
			type: "ElementType"
		}
	],
	status: "stable"
};

export default CardContentManifest;
