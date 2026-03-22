import { ComponentCategory, ComponentName } from "../../constants";
import { ComponentManifest } from "../types";

import Backdrop, { BackdropProps } from "./backdrop";

const BackdropManifest: ComponentManifest<BackdropProps> = {
	category: ComponentCategory.FEEDBACK,
	codeExamples: [
		{
			title: "Invisible Backdrop",
			code: `
<Backdrop open={true} invisible={true}>
	{/* Useful for blocking interaction without visual change */}
</Backdrop>`
		},
		{
			title: "Full Overlay",
			code: `
<Backdrop open={true} overlay={true}>
	<Typography variant="h4" className="text-white">
		System Updating...
	</Typography>
</Backdrop>`
		}
	],
	component: Backdrop,
	description: "Provides a dimmed overlay to signal a state change within the application and can be used to focus the user's attention on a particular element.",
	name: ComponentName.BACKDROP,
	parameters: [
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the backdrop is visible.",
			name: "open",
			required: true,
			type: "boolean"
		},
		{
			control: "none",
			description: "The content to be rendered on top of the backdrop (e.g., a CircularProgress or Modal).",
			name: "children",
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for padding, dimensions, or layout.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the backdrop is invisible (transparent), but still blocks interaction.",
			name: "invisible",
			required: false,
			type: "boolean"
		},
		{
			control: "none",
			description: "A function to be called when the backdrop is closed.",
			name: "onClose",
			required: false,
			type: "function"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Determines the z-index level. If true, uses the full-page overlay z-index; otherwise, uses a clipped/lower z-index.",
			name: "overlay",
			required: false,
			type: "boolean"
		}
	],
	status: "stable",
	actionMappings: {
		onClose: () => ({
			open: false
		})
	}
};

export default BackdropManifest;
