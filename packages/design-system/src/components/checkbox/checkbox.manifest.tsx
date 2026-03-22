import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import Checkbox, { CheckboxProps } from "./checkbox";

const CheckboxComponent = ({
	...CheckboxProps
}: CheckboxProps) => (
	<Checkbox
		{...CheckboxProps}
		onChange={() => {}}
	/>
);

const CheckboxManifest: ComponentManifest<CheckboxProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			title: "Basic Checkbox",
			code: `<Checkbox label="Subscribe to newsletter" checked={true} />`
		},
		{
			title: "Error State with Label Start",
			code: `<Checkbox label="Agree to Privacy Policy" error labelPlacement="start" />`
		}
	],
	component: CheckboxComponent,
	description: "A functional input component allowing users to toggle between checked and unchecked states, featuring custom styling and accessibility support.",
	name: ComponentName.CHECKBOX,
	parameters: [
		{
			control: "switch",
			defaultValue: false,
			description: "Whether the checkbox is currently checked.",
			name: "checked",
			required: false,
			type: "boolean"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for padding, dimensions, or layout.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Prevents user interaction when true.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, displays the checkbox in an error state.",
			name: "error",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "The text associated with the checkbox.",
			name: "label",
			options: [
				{label: "Accept terms and conditions", value: "Accept terms and conditions"},
				{label: "None", value: ""}
			],
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "end",
			description: "Position of the label relative to the checkbox.",
			name: "labelPlacement",
			options: ManifestUtils.getMappedParameterOptions(["end", "start"]),
			required: false,
			type: "'start' | 'end'"
		},
		{
			control: "select",
			defaultValue: "medium",
			description: "The overall scale of the checkbox.",
			name: "size",
			options: ManifestUtils.getMappedParameterOptions(["small", "medium"]),
			required: false,
			type: "'small' | 'medium'"
		}
	],
	status: "stable"
};

export default CheckboxManifest;
