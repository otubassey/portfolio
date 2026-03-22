import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import Alert, { AlertProps } from "./alert";

const AlertManifest: ComponentManifest<AlertProps> = {
	category: ComponentCategory.FEEDBACK,
	codeExamples: [
		{
			title: "Basic Alert",
			code: `
<Alert
	message="Changes saved successfully!"
	severity="success"
/>`
		},
		{
			title: "Error with Details",
			code: `
<Alert
	copyText="ERR_CONNECTION_REFUSED"
	detail="Check your internet connection or firewall settings. Status code: 503."
	message="Failed to connect to server"
	severity="error"
/>`
		},
		{
			title: "Outlined Info",
			code: `
<Alert
	message="System maintenance scheduled for tonight."
	severity="info"
	variant="outlined"
/>`
		}
	],
	component: Alert,
	description: "Displays important messages with varying severity levels. Supports collapsible detail sections with built-in copy-to-clipboard functionality.",
	name: ComponentName.ALERT,
	parameters: [
		{
			control: "select",
			description: "The primary message text to display in the alert.",
			name: "message",
			options: [
				{label: "Short message", value: "short message"},
				{label: "Long message", value: "This is a longer alert message that provides more detailed information to the user about the current state or action that has taken place."}
			],
			required: true,
			type: "string"
		},
		{
			control: "readonly",
			description: "Optional text that can be copied to the clipboard. If present, a copy button appears when details are expanded.",
			name: "copyText",
			required: false,
			syncWith: "detail",
			type: "string"
		},
		{
			control: "select",
			description: "Optional content to display in a collapsible section beneath the message.",
			name: "detail",
			options: [
				{label: "None", value: ""},
				{label: "Short detail", value: "Check your internet connection or firewall settings. Status code: 503."},
				{label: "Long detail", value: "Additional details about the alert can be placed here. This section can include more in-depth information to help the user understand the context of the alert."}
			],
			required: false,
			type: "ReactNode"
		},
		{
			control: "select",
			defaultValue: "error",
			description: "The severity level of the alert, which determines the icon and color scheme.",
			name: "severity",
			options: ManifestUtils.getMappedParameterOptions(["error", "info", "success", "warning"]),
			required: false,
			type: "'error' | 'info' | 'success' | 'warning'"
		},
		{
			control: "select",
			defaultValue: "standard",
			description: "The visual style variant of the alert container.",
			name: "variant",
			options: ManifestUtils.getMappedParameterOptions(["filled", "outlined", "standard"]),
			required: false,
			type: "'filled' | 'outlined' | 'standard'"
		}
	],
	status: "stable"
};

export default AlertManifest;
