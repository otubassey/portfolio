import { ComponentCategory, ComponentName } from "../../constants";
import { ComponentManifest } from "../types";

import Tooltip, { TooltipProps } from "./tooltip";

const TooltipManifest: ComponentManifest<TooltipProps> = {
	category: ComponentCategory.FEEDBACK,
	codeExamples: [
		{
			code: `<Tooltip content="Save changes" show={isHovered}>\n  <IconButton icon="save" />\n</Tooltip>`,
			title: "Icon Label Tooltip"
		},
		{
			code: `<Tooltip \n  content="This action cannot be undone" \n  show={true}\n>\n  <Button color="error">Delete</Button>\n</Tooltip>`,
			title: "Warning Tooltip"
		}
	],
	component: Tooltip,
	description: "A floating diagnostic element that appears near a target component to provide additional context or labels. Uses React Portals for top-level DOM rendering.",
	name: ComponentName.TOOLTIP,
	parameters: [
		{
			control: "readonly",
			description: "The primary element that the tooltip is anchored to.",
			name: "children",
			required: true,
			type: "ReactNode",
			value: "Hover or focus on me"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for the anchor wrapper (span).",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			description: "The content (text or React elements) to display inside the floating tooltip bubble.",
			name: "content",
			options: [
				{ label: "None", value: "" },
				{ label: "Simple Text", value: "Tooltip content goes here" },
				{ label: "Long Text", value: "This is a longer tooltip message that provides more detailed information about the element." }
			],
			required: false,
			type: "ReactNode"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Controls the visibility of the tooltip. Usually synced with hover or focus states.",
			name: "show",
			required: false,
			type: "boolean"
		}
	],
	status: "unstable"
};

export default TooltipManifest;
