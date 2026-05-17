import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";
import { TypographyColor } from "../typography";

import Text, { TextProps } from "./text";

const SIZE_OPTIONS = ["small", "large"] as const;

const TextManifest: ComponentManifest<TextProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<Text size="small" muted>\n  Last updated 2 minutes ago\n</Text>`,
			title: "Muted Helper Text"
		},
		{
			code: `<Text color="primary" size="lg">\n  Important announcement text\n</Text>`,
			title: "Large Primary Text"
		}
	],
	component: Text,
	description: "A simplified typography wrapper that abstracts variant selection into intuitive size and emphasis props.",
	extends: [ComponentName.TYPOGRAPHY],
	name: ComponentName.TEXT,
	parameters: [
		{
			control: "readonly",
			description: "The textual content or elements to be rendered within the typography component.",
			name: "children",
			required: true,
			type: "ReactNode",
			value: "Sample text content"
		},
		{
			control: "select",
			description: "The color of the text. If 'muted' prop is true, this value is overridden by the muted theme color.",
			name: "color",
			options: ManifestUtils.getTypographyColorOptions(),
			required: false,
			type: ManifestUtils.getEnumParameterType(Object.values(TypographyColor))
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, applies a muted/dimmed color style, overriding the standard color prop.",
			name: "muted",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			defaultValue: "large",
			description: "Determines the font size and line height. 'small' maps to body2, while others map to body1.",
			name: "size",
			options: ManifestUtils.getMappedParameterOptions(SIZE_OPTIONS),
			required: false,
			type: ManifestUtils.getEnumParameterType(SIZE_OPTIONS)
		}
	],
	status: "stable"
};

export default TextManifest;
