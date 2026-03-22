import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import Typography, { TypographyColor, TypographyProps, TypographyVariant } from "./typography";

const TypographyManifest: ComponentManifest<TypographyProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<Typography variant="h1" weight="bold">Main Heading</Typography>`,
			title: "Large Bold Heading"
		},
		{
			code: `<Typography variant="body2" color="muted" truncate>\n  This is a very long text that will be truncated with a tooltip.\n</Typography>`,
			title: "Truncated Body Text"
		}
	],
	component: Typography,
	description: "The core component for consistent text rendering. Handles responsive font scales, color themes, weight overrides, and automatic tooltip integration for truncated content.",
	name: ComponentName.TYPOGRAPHY,
	parameters: [
		{
			control: "select",
			description: "The text content or React elements to be rendered.",
			name: "children",
			options: [
				{ label: "Sample Text", value: "Sample Text" },
				{ label: "Long Text", value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
				{ label: "Custom React Node", value: <span><strong>Custom React Node</strong> with <em>styling</em></span> }
			],
			required: true,
			type: "ReactNode"
		},
		{
			control: "select",
			defaultValue: "left",
			description: "Sets the CSS text-alignment property.",
			name: "align",
			options: ["left", "center", "right"],
			required: false,
			type: "'left' | 'center' | 'right'"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom overrides.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "default",
			description: "Sets the text color using the design system's theme tokens.",
			name: "color",
			options: ManifestUtils.getTypographyColorOptions(),
			required: false,
			type: ManifestUtils.getEnumParameterType(Object.values(TypographyColor))
		},
		{
			control: "select",
			description: "Overrides the default HTML element associated with the chosen variant (e.g., rendering an h1 style as a p tag).",
			name: "component",
			options: ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div", "label", "dt", "dd"],
			required: false,
			type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label' | 'dt' | 'dd'"
		},
		{
			control: "none",
			description: "Standard HTML ID for DOM targeting.",
			name: "id",
			required: false,
			type: "string",
			value: "typography-id"
		},
		{
			control: "none",
			description: "Mouse enter event handler for interactive typography elements.",
			name: "onMouseEnter",
			required: false,
			type: "function"
		},
		{
			control: "none",
			description: "Mouse leave event handler for interactive typography elements.",
			name: "onMouseLeave",
			required: false,
			type: "function"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, restricts text to a single line with an ellipsis. Automatically triggers a Tooltip on hover if the text is overflowing.",
			name: "truncate",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			defaultValue: "body1",
			description: "Determines the visual scale (font size and line height) and default HTML tag.",
			name: "variant",
			options: Object.values(TypographyVariant),
			required: false,
			type: ManifestUtils.getEnumParameterType(Object.values(TypographyVariant))
		},
		{
			control: "select",
			description: "Overrides the default font-weight of the selected variant.",
			name: "weight",
			options: ["normal", "medium", "semibold", "bold"],
			required: false,
			type: "'normal' | 'medium' | 'semibold' | 'bold'"
		}
	],
	status: "unstable"
};

export default TypographyManifest;
