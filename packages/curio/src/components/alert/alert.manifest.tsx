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
		},
		{
			title: "Auto-hiding Alert",
			code: `
<Alert
	message="This message will disappear in 5 seconds."
	autoHideDuration={5000}
	severity="info"
	onClose={() => console.log("Alert dismissed")}
/>`
		},
		{
			title: "Critical Error with Pause on Hover",
			code: `
<Alert
	message="Critical system failure detected!"
	autoHideDuration={10000}
	continueOnHover={false}
	severity="error"
	variant="filled"
	transactionId="e6b6274a-4492-4b52-8a80-9c1ea5c3c137"
	detail="The upstream database connection timed out after 30 seconds."
/>`
		}
	],
	component: Alert,
	description: "Displays important messages with varying severity levels. Supports collapsible detail section with built-in copy-to-clipboard functionality, auto-hide timers with progress bars, and manual dismissal.",
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
			control: "select",
			description: "The time in milliseconds before the alert automatically closes. Set to a value > 0 to enable.",
			name: "autoHideDuration",
			options: [
				{ label: "None", value: 0 },
				{ label: "3 Seconds", value: 3000 },
				{ label: "5 Seconds", value: 5000 },
				{ label: "10 Seconds", value: 10000 }
			],
			required: false,
			type: "number"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the auto-hide timer continues even when the user hovers over the alert.",
			name: "continueOnHover",
			required: false,
			type: "boolean"
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
			control: "none",
			description: "Enables the manual close button if a callback is provided.",
			name: "onClose",
			required: false,
			type: "function"
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
			description: "Optional text identifier that serves as an essential correlation token linking client-facing errors directly to server-side telemetry log entries.",
			name: "transactionId",
			options: [
				{label: "None", value: ""},
				{label: "UUID", value: "e6b6274a-4492-4b52-8a80-9c1ea5c3c137"}
			],
			required: false,
			type: "string"
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
	status: "unstable"
};

export default AlertManifest;
