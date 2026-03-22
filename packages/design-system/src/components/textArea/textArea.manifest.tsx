import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import TextArea, { TextAreaProps } from "./textArea";

const TextAreaComponent = ({ onChange, ...props}: TextAreaProps) => (
	<TextArea onChange={() => {}} {...props} />
);

const TextAreaManifest: ComponentManifest<TextAreaProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<TextArea \n  label="Comments" \n  placeholder="Type here..." \n  minRows={4} \n  fullWidth \n/>`,
			title: "Standard Auto-Expanding TextArea"
		},
		{
			code: `<TextArea \n  label="Description" \n  error="Description is too short" \n  required \n/>`,
			title: "TextArea with Error Message"
		}
	],
	component: TextAreaComponent,
	description: "A multi-line text input component that supports automatic vertical expansion, built-in label integration, and accessibility-compliant error handling.",
	name: ComponentName.TEXT_AREA,
	parameters: [
		{
			control: "readonly",
			description: "Additional Tailwind CSS classes for custom container styling.",
			name: "className",
			required: false,
			type: "string"
		},
		({label}) => ({
			control: !label ? "none" : "select",
			defaultValue: "primary",
			description: "The theme color used for the focus ring and borders.",
			name: "color",
			options: ["primary", "secondary"],
			required: false,
			type: "'primary' | 'secondary'"
		}),
		{
			control: "switch",
			defaultValue: false,
			description: "If true, prevents user interaction and applies disabled styling.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "If a string is provided, it displays as an error message beneath the input and applies error styling.",
			name: "error",
			options: ManifestUtils.getErrorParameterOptions(),
			required: false,
			type: "boolean | string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the component expands to 100% of the container width.",
			name: "fullWidth",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "The descriptive label text displayed above the input.",
			name: "label",
			options: ManifestUtils.getMappedParameterOptions(["Comments"]),
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: 10,
			description: "The maximum number of rows the component will expand to before enabling internal scrolling.",
			name: "maxRows",
			options: [
				{ label: "1", value: 1 },
				{ label: "2", value: 2 },
				{ label: "3", value: 3 },
				{ label: "4", value: 4 },
				{ label: "5", value: 5 },
				{ label: "6", value: 6 },
				{ label: "7", value: 7 },
				{ label: "8", value: 8 },
				{ label: "9", value: 9 },
				{ label: "10", value: 10 },
				{ label: "20", value: 20 },
				{ label: "None", value: null }
			],
			required: false,
			type: "number"
		},
		{
			control: "select",
			defaultValue: 3,
			description: "The minimum number of visible text rows. Sets the base height of the component.",
			name: "minRows",
			options: [
				{ label: "1", value: 1 },
				{ label: "2", value: 2 },
				{ label: "3", value: 3 },
				{ label: "4", value: 4 },
				{ label: "5", value: 5 },
				{ label: "6", value: 6 },
				{ label: "7", value: 7 },
				{ label: "8", value: 8 },
				{ label: "9", value: 9 },
				{ label: "10", value: 10 }
			],
			required: false,
			type: "number"
		},
		{
			control: "none",
			description: "Callback function triggered on every keystroke. Receives the standard change event.",
			name: "onChange",
			required: false,
			type: "function"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, displays a required indicator and applies native HTML validation attributes.",
			name: "required",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			defaultValue: "medium",
			description: "Controls the vertical padding and font size of the input.",
			name: "size",
			options: ["small", "medium"],
			required: false,
			type: "'small' | 'medium'"
		},
		{
			control: "readonly",
			description: "The current value of the text area. Use this for controlled components.",
			name: "value",
			required: false,
			type: "string",
			value: "Sample text content that demonstrates the auto-expanding behavior of the TextArea component. As you add more lines, the component will grow vertically until it reaches the maxRows limit."
		}
	],
	status: "unstable"
};

export default TextAreaManifest;
