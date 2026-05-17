import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import Select, { SelectProps } from "./select";

const SelectComponent = ({...props}: SelectProps) => {
	return (
		<Select
			{...props}
			value=""
			onChange={() => {}}
		/>
	);
};

const SelectManifest: ComponentManifest<SelectProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<Select \n  label="Country" \n  value={country} \n  onChange={setCountry} \n  options={[{ label: 'USA', value: 'us' }, { label: 'Canada', value: 'ca' }]} \n/>`,
			title: "Basic Select"
		},
		{
			code: `<Select \n  label="Category" \n  value={val} \n  onChange={setVal} \n  noneLabel="All Categories" \n  error \n/>`,
			title: "Select with Error and Null Option"
		}
	],
	component: SelectComponent,
	description: "A form control for selecting a single value from a list of options, built on top of the Dropdown and Menu systems.",
	name: ComponentName.SELECT,
	parameters: [
		{
			control: "none",
			description: "Callback function triggered when the selected value changes. Receives the new value as an argument.",
			name: "onChange",
			required: true,
			type: "function"
		},
		{
			control: "readonly",
			description: "The currently selected value corresponding to an entry in the options array.",
			name: "value",
			required: true,
			type: "string"
		},
		{
			control: "select",
			description: "Custom content to be rendered inside the select component.",
			name: "children",
			options: [
				{ label: "None", value: null },
				{ label: "Custom React Node", value: <span style={{ color: 'red' }}>Red Text</span> },
				{ label: "String Content", value: "Just a string" }
			],
			required: false,
			type: "ReactNode"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the component is non-interactive and visually grayed out.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Configuration props passed to the underlying Dropdown component.",
			name: "dropdownProps",
			required: false,
			type: "object"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, applies error styling to the label and trigger button.",
			name: "error",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the component expands to fill its container width.",
			name: "fullWidth",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "Label text displayed above the select input.",
			name: "label",
			options: ManifestUtils.getMappedParameterOptions(["Country"]),
			required: false,
			type: "string"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Configuration props passed to the internal Label component.",
			name: "labelProps",
			required: false,
			type: "object"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Configuration props applied to every MenuItem generated from the options array.",
			name: "menuItemProps",
			required: false,
			type: "object"
		},
		{
			control: "select",
			description: "Adds an empty 'None' option. If a string is provided, that string is used as the label.",
			name: "noneLabel",
			options: [
				{label: "None", value: ""},
				{label: "Custom Label", value: "All Options"},
				{label: "Boolean - true", value: true},
				{label: "Boolean - false", value: false}
			],
			required: false,
			type: "boolean | string"
		},
		{
			control: "select",
			defaultValue: [],
			description: "An array of label-value pairs used to generate the menu items automatically.",
			name: "options",
			options: [
				{label: "None", value: ""},
				{label: "Items", value: [
					{ label: "United States", value: "us" },
					{ label: "Canada", value: "ca" },
					{ label: "Mexico", value: "mx" }
				]}
			],
			required: false,
			type: "array"
		},
		{
			control: "select",
			defaultValue: "Select...",
			description: "The text displayed in the trigger button when no value is selected.",
			name: "placeholder",
			options: ManifestUtils.getMappedParameterOptions(["Choose an option"]),
			required: false,
			type: "string"
		},
		({label}) => ({
			control: !label ? "none" : "switch",
			defaultValue: false,
			description: "If true, displays a required indicator (typically an asterisk) next to the label.",
			name: "required",
			required: false,
			type: "boolean"
		})
	],
	status: "unstable"
};

export default SelectManifest;
