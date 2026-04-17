import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import InlineButton, { InlineButtonProps } from "./inlineButton";

const InlineButtonComponent = ({ ...props }) => (
	<p>Please click <InlineButton {...props}>here</InlineButton> to see the details.</p>
);

export const InlineButtonManifest: ComponentManifest<InlineButtonProps<any>> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<Typography>\n  Please click <InlineButton onClick={handleOpen}>here</InlineButton> to see the details.\n</Typography>`,
			title: "Inline with Typography"
		},
		{
			code: `<InlineButton color="error" startIcon="trash">Delete Account</InlineButton>`,
			title: "Compact Action"
		}
	],
	component: InlineButtonComponent,
	description: "An optimized version of the Button component for inline usage. It removes default padding and casing to allow the button to blend seamlessly with surrounding text while retaining full button functionality.",
	extends: [
		ComponentName.BUTTON
	],
	name: ComponentName.INLINE_BUTTON,
	parameters: [
		{ // TODO: for parameters that we do not want to show in lookbook, we should add a "hideInLookbook" property or something similar
			control: "none",
			description: "The content of the button.",
			name: "children",
			required: false,
			type: "ReactNode",
			value: "Click Me"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes to apply to the button.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "primary",
			description: "The theme color applied to the variant.",
			name: "color",
			options: ["primary", "secondary", "inherit", "error", "warning", "success", "info"],
			required: false,
			type: "'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | 'inherit'"
		},
		{
			control: "select",
			defaultValue: "uppercase",
			description: "The text transform of the button.",
			name: "textTransform",
			options: [
				{label: "None", value: "none"},
				{label: "lowercase", value: "lowercase"},
				{label: "uppercase", value: "uppercase"}
			],
			required: false,
			type: "'none' | 'lowercase' | 'uppercase'"
		},
		{
			control: "select",
			defaultValue: "contained",
			description: "The visual style of the button.",
			name: "variant",
			options: ManifestUtils.getMappedParameterOptions(["text", "outlined", "contained"]),
			required: false,
			type: "'contained' | 'outlined' | 'text'"
		}
	],
	status: "unstable"
};

export default InlineButtonManifest;
