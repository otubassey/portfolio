import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import Icon, { IconProps } from "./icon";

const IconManifest: ComponentManifest<IconProps> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `<Icon name="check" size="medium" color="success" />`,
			title: "Standard Library Icon"
		},
		{
			code: `<Icon size={32} className="text-blue-500" name="info" />`,
			title: "Custom Pixel Sizing"
		},
		{
			code: `<Icon component={CustomSvgLogo} size="large" />`,
			title: "Custom SVG Component"
		}
	],
	component: Icon,
	description: "A normalized SVG wrapper that ensures consistent sizing and accessibility across the application. It supports pre-defined library icons, custom SVG components, and flexible dimension overrides.",
	name: ComponentName.ICON,
	parameters: [
		{
			control: "none",
			description: "Additional Tailwind CSS classes for color (e.g., 'text-primary') or animation (e.g., 'animate-spin').",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			description: "A custom React component or SVG element to render instead of a library-defined icon.",
			name: "component",
			options: [
				{ label: "None", value: "" },
				{ label: "CustomSvgLogo", value: <svg><circle cx="10" cy="10" r="10" fill="blue" /></svg> }
			],
			required: false,
			type: "ElementType"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the 'aria-hidden' attribute is removed, making the icon discoverable by screen readers.",
			name: "hideAriaLabel",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "The unique identifier for a pre-defined icon in the library. Triggers a developer warning if the name is not found.",
			name: "name",
			options: ["check", "close", "search", "unknown (triggers fallback)"],
			required: false,
			type: ManifestUtils.getIconNames()
		},
		{
			control: "select",
			defaultValue: "small",
			description: "Determines the dimensions of the icon. Supports theme constants, numeric pixel values, or CSS strings (rem/em).",
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
			required: false,
			type: "number | string | 'small' | 'medium' | 'large'"
		}
	],
	status: "stable"
};

export default IconManifest;
