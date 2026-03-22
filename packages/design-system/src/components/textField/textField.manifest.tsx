import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import TextField, { TextFieldProps } from "./textField";

const TextFieldComponent = ({ onChange, ...props }: TextFieldProps) => (
	<TextField onChange={() => {}} {...props} />
);

const TextFieldManifest: ComponentManifest<TextFieldProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<TextField \n  label="Email Address" \n  placeholder="user@example.com" \n  startIcon={<Icon name="mail" />} \n  fullWidth \n/>`,
			title: "Standard Input with Icon"
		},
		{
			code: `<TextField \n  label="Password" \n  error="Incorrect password" \n  type="password" \n/>`,
			title: "Input with Error State"
		}
	],
	component: TextFieldComponent,
	description: "A standard text input field featuring support for labels, icons, error messages, and multiple theme colors.",
	name: ComponentName.TEXT_FIELD,
	parameters: [
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom layout or container styling.",
			name: "className",
			required: false,
			type: "string"
		},
		({ label }) => ({
			control: !label ? "none" : "select",
			defaultValue: "primary",
			description: "Determines the theme-specific focus ring and border coloring.",
			name: "color",
			options: ["primary", "secondary"],
			required: false,
			type: "'primary' | 'secondary'"
		}),
		{
			control: "switch",
			defaultValue: false,
			description: "If true, prevents user interaction and applies dimmed styling.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "A ReactNode (usually an Icon) rendered at the end of the input field.",
			name: "endIcon",
			options: ManifestUtils.getIconParameterOptions([
				{ name: "check", label: "check (text)" },
				{ name: "close", asElement: true, label: "close (Element)"}
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "select",
			description: "If a string is provided, it renders an error message below the input and applies error styling.",
			name: "error",
			options: ManifestUtils.getErrorParameterOptions(),
			required: false,
			type: "boolean | string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the component expands to 100% of its parent container width.",
			name: "fullWidth",
			required: false,
			type: "boolean"
		},
		{
			control: "none",
			description: "The unique HTML identifier for the input. A unique ID is auto-generated if this is omitted.",
			name: "id",
			required: false,
			type: "string"
		},
		{
			control: "select",
			description: "Label text displayed above the input field to provide context to the user.",
			name: "label",
			options: ManifestUtils.getMappedParameterOptions(["Country"]),
			required: false,
			type: "string"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Props passed directly to the internal Label component.",
			name: "labelProps",
			required: false,
			type: "object"
		},
		{
			control: "none",
			description: "Callback function triggered on every input change. Receives the standard ChangeEvent.",
			name: "onChange",
			required: false,
			type: "function"
		},
		({ label }) => ({
			control: !label ? "none" : "switch",
			defaultValue: false,
			description: "If true, marks the input as required for form submission and adds a required indicator.",
			name: "required",
			required: false,
			type: "boolean"
		}),
		{
			control: "select",
			defaultValue: "medium",
			description: "Controls the vertical padding and font size of the input field.",
			name: "size",
			options: ["small", "medium"],
			required: false,
			type: "'small' | 'medium'"
		},
		{
			control: "select",
			description: "A ReactNode (usually an Icon) rendered at the start of the input field.",
			name: "startIcon",
			options: ManifestUtils.getIconParameterOptions([
				{ name: "mail", label: "check (text)" },
				{ name: "search", asElement: true, label: "search (Element)"}
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "readonly",
			description: "The current value of the input. Use for controlled component implementations.",
			name: "value",
			required: false,
			type: "string",
			value: "Sample text"
		}
	],
	status: "unstable"
};

export default TextFieldManifest;
