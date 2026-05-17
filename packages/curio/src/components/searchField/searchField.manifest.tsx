import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import SearchField, { SearchFieldProps } from "./searchField";

const SearchFieldManifest: ComponentManifest<SearchFieldProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<SearchField onChange={(val) => console.log('Searching for:', val)} />`,
			title: "Basic Search Implementation"
		},
		{
			code: `<SearchField placeholder="Search users..." fullWidth={false} className="max-w-xs" />`,
			title: "Customized Search Layout"
		}
	],
	component: SearchField,
	description: "A specialized search input featuring a leading search icon and responsive visibility logic, optimized for filtering content.",
	extends: [ComponentName.TEXT_FIELD],
	name: ComponentName.SEARCH_FIELD,
	parameters: [
		{
			control: "none",
			description: "Additional Tailwind CSS classes for the search field container.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the input expands to fill the width of its parent container.",
			name: "fullWidth",
			required: false,
			type: "boolean"
		},
		{
			control: "none",
			description: "Callback function triggered on input value change, receiving the current search string.",
			name: "onChange",
			required: false,
			type: "function"
		},
		{
			control: "none",
			defaultValue: "Search items...",
			description: "The hint text displayed when the input is empty.",
			name: "placeholder",
			required: false,
			type: "string"
		},
		{
			control: "readonly",
			description: "The current controlled value of the search input.",
			name: "value",
			required: false,
			type: "string",
			value: "Example search query"
		}
	],
	status: "unstable"
};

export default SearchFieldManifest;
