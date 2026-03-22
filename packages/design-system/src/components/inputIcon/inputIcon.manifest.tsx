import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import InputIcon, { InputIconProps } from "./inputIcon";

const InputIconManifest: ComponentManifest<InputIconProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			title: "Icon by Name",
			code: `<InputIcon icon="check" size={16} className="text-green-500" />`
		},
		{
			title: "Custom ReactNode Icon",
			code: `<InputIcon icon={<svg>...</svg>} size={20} />`
		}
	],
	component: InputIcon,
	description: "A wrapper component for icons that provides consistent sizing and layout within input contexts.",
	extends: [
		ComponentName.ICON
	],
	name: ComponentName.INPUT_ICON,
	parameters: [
		{
			control: "select",
			defaultValue: "small",
			description: "The size of the icon in pixels or a standard sizing token.",
			name: "size",
			options: [
				{label: "12", value: 12},
				{label: "14", value: 14},
				{label: "16", value: "16"},
				{label: "20", value: "20"},
				{label: "small", value: "small"},
				{label: "medium", value: "medium"},
				{label: "large", value: "large"},
				{label: "None", value: ""}
			],
			required: true,
			type: "number | string | 'small' | 'medium' | 'large'"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for the button icon.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			description: "The name of the icon to render or a custom ReactNode.",
			name: "icon",
			options: ManifestUtils.getIconParameterOptions([
				{name: "check"},
				{name: "close", asElement: true, label: "close (as element)"},
				{name: "search"}
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`,
			value: "check"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Props for the icon component.",
			name: "iconProps",
			required: false,
			type: "object"
		}
	],
	status: "stable"
};

export default InputIconManifest;
