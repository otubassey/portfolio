import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";
import { TypographyColor } from "../typography";

import Label, { LabelProps } from "./label";

const LabelManifest: ComponentManifest<LabelProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<Label htmlFor="email-input" required>Email Address</Label>`,
			title: "Required Form Label"
		},
		{
			code: `<Label>Standard Label</Label>`,
			title: "Standard Label"
		}
	],
	component: Label,
	description: "A semantic label component built on Typography that handles required asterisks, error coloring, and accessibility for form inputs.",
	extends: [
		ComponentName.TYPOGRAPHY
	],
	name: ComponentName.LABEL,
	parameters: [
		{
			control: "none",
			description: "The text content or React nodes to be displayed as the label.",
			name: "children",
			required: true,
			type: "ReactNode",
			value: "Label Text"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for the label.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "default",
			description: "The theme color of the text. Automatically switches to 'error' if error prop is true.",
			name: "color",
			options: ManifestUtils.getTypographyColorOptions(),
			required: false,
			type: ManifestUtils.getEnumParameterType(Object.values(TypographyColor))
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, appends a red asterisk (*) to the label for form validation signaling.",
			name: "required",
			required: false,
			type: "boolean"
		}
	],
	status: "stable"
};

export default LabelManifest;
