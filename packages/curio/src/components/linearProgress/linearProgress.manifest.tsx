import { ComponentCategory, ComponentManifest, ComponentName, ManifestUtils } from "@otuekong-portfolio/curio";

import LinearProgress, { LinearProgressProps } from "./linearProgress";

const LinearProgressManifest: ComponentManifest<LinearProgressProps> = {
	category: ComponentCategory.FEEDBACK,
	codeExamples: [
		{
			code: `<LinearProgress variant="determinate" value={65} label="Storage Capacity" />`,
			title: "Determinate Progress with Label"
		},
		{
			code: `<LinearProgress variant="indeterminate" color="secondary" />`,
			title: "Indeterminate System Loader"
		},
		{
			code: `<LinearProgress color="#f43f5e" value={90} className="h-2" />`,
			title: "Custom Height & Hex Color"
		}
	],
	component: LinearProgress,
	description: "A specialized indicator for visualizing task progression or system activity. Supports fixed values, continuous loading states, and dynamic theme synchronization.",
	name: ComponentName.LINEAR_PROGRESS,
	parameters: [
		{
			control: "select",
			description: "Optional text display that provides context for the operation being tracked.",
			name: "label",
			options: ManifestUtils.getMappedParameterOptions(["Uploading photos..."]),
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "primary",
			description: "The primary accent color. Accepts theme tokens (primary, secondary) or raw CSS color values.",
			name: "color",
			options: [
				{ label: "Primary", value: "primary" },
				{ label: "Secondary", value: "secondary" },
				{ label: "Inherit", value: "inherit" },
				{ label: "Custom Hex (Rose)", value: "#f43f5e" }
			],
			required: false,
			type: "'primary' | 'secondary' | 'inherit' | string"
		},
		{
			control: "select",
			defaultValue: 0,
			description: "The percentage of completion (0-100). Ignored when variant is set to 'indeterminate'.",
			name: "value",
			options: [
				{ label: "-10 (Below the min of 0)", value: -10 },
				{ label: "0", value: 0 },
				{ label: "10", value: 10 },
				{ label: "50", value: 50 },
				{ label: "100", value: 100 },
				{ label: "150 (Over the max of 100)", value: 150 }
			],
			required: false,
			type: "number"
		},
		{
			control: "select",
			defaultValue: "determinate",
			description: "Determines if the progress is calculated (determinate) or representing an ongoing process (indeterminate).",
			name: "variant",
			options: ["determinate", "indeterminate"],
			required: false,
			type: "string"
		}
	],
	status: "unstable"
};

export default LinearProgressManifest;
