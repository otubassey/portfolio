import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import CopyButton, { CopyButtonProps } from "./copyButton";

const CopyButtonManifest: ComponentManifest<CopyButtonProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			title: "Basic Usage",
			code: `<CopyButton value="npm install @your-org/ui-library" />`
		},
		{
			title: "Custom Callback",
			code: `<CopyButton value="SecretKey_123" onCopyChange={(copied) => console.log('Copied status:', copied)} />`
		}
	],
	component: CopyButton,
	description: "A specialized button that copies a string to the clipboard, providing visual feedback and state management via the Clipboard API.",
	extends: [
		ComponentName.BUTTON_BASE
	],
	name: ComponentName.COPY_BUTTON,
	parameters: [
		{
			control: "readonly",
			description: "The string value to be written to the clipboard.",
			name: "value",
			required: true,
			type: "string",
			value: "Hello, World!"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom transition durations or easing functions.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "none",
			description: "Callback function that is called when the button is clicked.",
			name: "onClick",
			required: false,
			type: "function"
		},
		{
			control: "none",
			description: "Callback function that is called when the copied state changes (e.g., after a successful copy or when the state resets). Receives a boolean indicating the current copied status.",
			name: "onCopyChange",
			required: false,
			type: "function"
		}
	],
	status: "stable"
};

export default CopyButtonManifest;
