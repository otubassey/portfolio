import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import LinkButton, { LinkButtonProps } from "./linkButton";

const LinkButtonComponent = ({ onClick, ...props }: LinkButtonProps) => (
	<div className="flex gap-4 items-center">
		<LinkButton {...props} onClick={() => {}}>
			Click me
		</LinkButton>
	</div>
);

const LinkButtonManifest: ComponentManifest<LinkButtonProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<LinkButton onClick={handleOpenModal}>\n  Open Settings\n</LinkButton>`,
			title: "Basic Link Button"
		},
		{
			code: `<LinkButton \n  color="inherit" \n  underline="always" \n  onClick={handleToggle}\n>\n  Show More Details\n</LinkButton>`,
			title: "Inherited Color with Underline"
		},
		{
			code: `<LinkButton \n  disabled \n  onClick={handleAction}\n>\n  Coming Soon\n</LinkButton>`,
			title: "Disabled State"
		}
	],
	component: LinkButtonComponent,
	description: "A button component styled to look like a hyperlink. Use for actions that should appear as links (modals, toggles, etc.) but need button semantics for accessibility. For actual navigation, use the Link component instead.",
	extends: [
		ComponentName.BUTTON_BASE
	],
	name: ComponentName.LINK_BUTTON,
	parameters: [
		{
			control: "none",
			description: "The content to be rendered within the link button.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Callback function triggered when the link button is clicked.",
			name: "onClick",
			required: true,
			type: "function"
		},
		{
			control: "none",
			description: "Additional CSS class names to apply to the button element.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "primary",
			description: "The color theme of the link button text.",
			name: "color",
			options: ManifestUtils.getMappedParameterOptions([
				"primary",
				"inherit"
			]),
			required: false,
			type: '"primary" | "inherit"'
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, prevents user interaction and applies disabled styling.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			defaultValue: "hover",
			description: "Controls when the underline decoration appears on the link button.",
			name: "underline",
			options: [
				{ label: "none", value: "none" },
				{ label: "hover", value: "hover" },
				{ label: "always", value: "always" }
			],
			required: false,
			type: '"none" | "hover" | "always"'
		}
	],
	status: "stable"
};

export default LinkButtonManifest;
