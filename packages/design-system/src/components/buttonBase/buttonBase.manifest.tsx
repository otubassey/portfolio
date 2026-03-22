import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import ButtonBase from "./buttonBase";

const ButtonBaseManifest: ComponentManifest = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			title: "Basic Usage",
			code: `
<ButtonBase
  label="Click Me"
  onClick={() => console.log('clicked')}
  className="bg-blue-500 text-white px-4 py-2 rounded"
>
  Custom Button Content
</ButtonBase>`
		}
	],
	component: ButtonBase,
	description: "The foundational component for building buttons. It provides core functionality and accessibility features, while allowing for complete visual customization through props and styling.",
	name: ComponentName.BUTTON_BASE,
	parameters: [
		{
			control: "readonly",
			description: "The content of the button.",
			name: "children",
			required: false,
			type: "ReactNode",
			value: "Click Me"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for padding, dimensions, or layout.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "button",
			description: "The underlying HTML element or React component to render.",
			name: "component",
			options: ManifestUtils.getMappedParameterOptions(["a", "button", "div", "span"]),
			required: false,
			type: "ElementType"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the component is disabled and prevents all user interaction.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the component will take up the full width of its container.",
			name: "fullWidth",
			required: false,
			type: "boolean"
		},
		{
			control: "readonly",
			description: "The aria-label used for accessibility.",
			name: "label",
			required: false,
			type: "string",
			value: "Button Base"
		},
		{
			control: "none",
			description: "Callback function that is called when the button is clicked.",
			name: "onClick",
			required: false,
			type: "function"
		},
		{
			control: "select",
			defaultValue: "button",
			description: "The HTML button type attribute.",
			name: "type",
			options: ManifestUtils.getMappedParameterOptions(["button", "reset", "submit"]),
			required: false,
			type: "'button' | 'submit' | 'reset'"
		}
	],
	status: "stable"
};

export default ButtonBaseManifest;
