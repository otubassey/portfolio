import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import ErrorBoundary, { ErrorBoundaryProps } from "./errorBoundary";

const ThrowError = () => {
	throw new Error("Simulated runtime error from the Component Manifest.");
	return null;
};

const ErrorBoundaryManifest: ComponentManifest<ErrorBoundaryProps> = {
	category: ComponentCategory.FEEDBACK,
	codeExamples: [
		{
			code: `<ErrorBoundary>\n  <HeavyDataComponent />\n</ErrorBoundary>`,
			title: "Basic Safety Wrapper"
		},
		{
			code: `<ErrorBoundary fallback={<Text color="error">Custom Error Message</Text>}>\n  <UnstableComponent />\n</ErrorBoundary>`,
			title: "Custom Fallback UI"
		}
	],
	component: ErrorBoundary,
	description: "A functional safety wrapper that catches JavaScript errors anywhere in its child component tree, logs those errors, and displays a fallback UI (either a custom element or a default Alert) instead of crashing the entire application.",
	name: ComponentName.ERROR_BOUNDARY,
	parameters: [
		{
			control: "select",
			description: "The component tree to be monitored for runtime errors.",
			name: "children",
			options: [
				{ label: "Healthy Component", value: <div className="p-4 bg-green-50 text-green-700">Everything is working fine!</div>  },
				{ label: "Component with Runtime Error", value: <ThrowError /> }
			],
			required: true,
			type: "ReactNode"
		},
		{
			control: "select",
			description: "A custom React element to display when an error is caught. If omitted, the component renders a detailed warning Alert.",
			name: "fallback",
			options: [
				{ label: "None", value: "" },
				{ label: "Custom Error Message", value: <div color="text-red-500">An error has occurred.</div> }
			],
			required: false,
			type: "ReactNode"
		}
	],
	status: "stable"
};

export default ErrorBoundaryManifest;
