import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import EmailTextField, { EmailTextFieldProps } from "./emailTextField";

const EmailTextFieldComponent = ({
	onBlur,
	onChange,
	...props
}: EmailTextFieldProps) => (
	<EmailTextField
		{...props}
		onBlur={() => {}}
		onChange={() => {}}
	/>
);

const EmailTextFieldManifest: ComponentManifest<EmailTextFieldProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<EmailTextField label="Email Address" required />`,
			title: "Basic Required Email"
		},
		{
			code: `<EmailTextField label="Newsletter Signup" placeholder="Enter your email..." />`,
			title: "Email with Placeholder"
		}
	],
	component: EmailTextFieldComponent,
	description: "A specialized text input for email addresses with built-in regex validation, error handling, and accessibility support.",
	extends: [
		ComponentName.TEXT_FIELD
	],
	name: ComponentName.EMAIL_TEXT_FIELD,
	parameters: [
		{
			control: "select",
			description: "An external error message that overrides internal validation.",
			name: "customError",
			options: [
				{ label: "None", value: "" },
				{ label: "Invalid email format", value: "Invalid email format" },
				{ label: "Long email error message", value: "Ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }
			],
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Prevents user interaction and visually dims the input.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "Label text associated with the input field.",
			name: "label",
			options: [
				{ label: "None", value: "" },
				{ label: "Email Address", value: "Email Address" }
			],
			required: false,
			type: "string"
		},
		{
			control: "none",
			description: "Callback fired when the input loses focus and validation runs.",
			name: "onBlur",
			required: false,
			type: "function"
		},
		{
			control: "none",
			description: "Callback fired when the value changes.",
			name: "onChange",
			required: false,
			type: "function"
		},
		{
			control: "none",
			description: "Callback fired with the validation state (true/false) after blurring.",
			name: "onValidityChange",
			required: false,
			type: "function"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Whether the field is required for form submission.",
			name: "required",
			required: false,
			type: "boolean"
		},
		{
			control: "readonly",
			description: "The current text value of the email input.",
			name: "value",
			required: false,
			type: "string",
			value: "user@example.com"
		},
	],
	status: "unstable"
};

export default EmailTextFieldManifest;
