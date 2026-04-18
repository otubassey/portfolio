import { ComponentCategory, ComponentName } from "../../constants";
import { ComponentManifest } from "../types";

import StatusChip, { StatusChipProps } from "./statusChip";

const StatusChipManifest: ComponentManifest<StatusChipProps<string>> = {
	category: ComponentCategory.DATA_DISPLAY,
	codeExamples: [
		{
			code: `const MAPPING = { \n  stable: { color: "success", label: "Stable" },\n  unstable: { color: "warning", label: "Unstable" }\n};\n\n<StatusChip \n  status="stable" \n  statusMapping={MAPPING} \n  srOnlyPrefix="Component status: " \n/>`,
			title: "Standard Domain Mapping"
		},
		{
			code: `<StatusChip \n  status="missing-key" \n  statusMapping={{ active: { color: "success", label: "Active" } }} \n/>`,
			title: "Diagnostic Error State"
		}
	],
	component: StatusChip,
	description: "A generic status indicator. If the provided status is null or missing from the mapping, it renders a high-visibility Error Chip with a specific diagnostic label.",
	extends: [ComponentName.CHIP],
	name: ComponentName.STATUS_CHIP,
	parameters: [
		{
			control: "select",
			description: "The status key. If null or unmapped, the component renders a diagnostic error label.",
			name: "status",
			options: [
				{ label: "None", value: null },
				{ label: "Active", value: "active" },
				{ label: "Completed", value: "completed" },
				{ label: "In Progress", value: "in-progress" },
				{ label: "Unmapped Value", value: "archived" },
				{ label: "Unstable Value", value: "unstable" }
			],
			required: true,
			type: "string"
		},
		{
			control: "select",
			description: "A required dictionary of colors and labels. If missing, the component renders a 'Missing Mapping' error state.",
			name: "statusMapping",
			options: [
				{ label: "Default Mapping", value: {
					active: { color: "success", label: "Active" },
					completed: { color: "default", label: "Completed" },
					"in-progress": { color: "secondary", label: "In Progress" },
					unstable: { color: "warning", label: "Unstable" }
				}},
				{ label: "Custom Mapping", value: { active: { color: "primary", label: "Currently Active" }, completed: { color: "secondary", label: "Finished" } } },
				{ label: "Empty Mapping (Error State)", value: {} },
				{ label: "Null Mapping (Error State)", value: null }
			],
			required: true,
			type: "object"
		},
		{
			control: "select",
			description: "Visually hidden text for screen readers (e.g., 'Status: ').",
			name: "srOnlyPrefix",
			options: [
				{ label: "None", value: "" },
				{ label: "Current Status: ", value: "Current Status: " }
			],
			required: false,
			type: "string"
		}
	],
	status: "unstable"
};

export default StatusChipManifest;
