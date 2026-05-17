import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import Switch, { SwitchProps } from "./switch";

const SwitchComponent = ({ onChange, ...props }: SwitchProps) => (
	<Switch onChange={() => {}} {...props} />
);

const SwitchManifest: ComponentManifest<SwitchProps> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<Switch checked={isEnabled} onChange={setIsEnabled} label="Notifications" />`,
			title: "Basic Toggle"
		},
		{
			code: `<Switch \n  checked={isDark} \n  onChange={setIsDark} \n  checkedIcon={<Icon name="moon" />} \n  uncheckedIcon={<Icon name="sun" />} \n/>`,
			title: "Iconized Mode Switch"
		}
	],
	component: SwitchComponent,
	description: "A toggle control that allows users to switch between two mutually exclusive states (on/off), featuring support for custom icons, labels, and track content.",
	name: ComponentName.SWITCH,
	parameters: [
		{
			control: "switch",
			description: "The current state of the switch. If true, the toggle is in the 'on' position.",
			name: "checked",
			required: true,
			type: "boolean"
		},
		{
			control: "none",
			description: "Callback function triggered when the switch is toggled. Returns the new boolean state.",
			name: "onChange",
			required: true,
			type: "function"
		},
		{
			control: "select",
			description: "Label displayed when checked (End/Bottom position).",
			name: "checkedLabel",
			options: ManifestUtils.getMappedParameterOptions(["On"]),
			required: false,
			type: "ReactNode"
		},
		{
			control: "select",
			description: "Icon visible in the active state. Can be a string name from the icon set or a custom React element.",
			name: "checkedIcon",
			options: ManifestUtils.getIconParameterOptions([
				{ name: "check", label: "check (Element)", asElement: true, iconProps: {size: "1rem"} },
				{ name: "moon" },
				{ name: "sun", label: "sun (Element)", asElement: true, iconProps: {size: "1rem"} }
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom spacing or positioning.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, prevents user interaction and applies a reduced opacity.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, applies error styling to labels and the switch track.",
			name: "error",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			defaultValue: "horizontal",
			description: "Determines where the label is positioned relative to the switch toggle.",
			name: "labelPlacement",
			options: ["horizontal", "vertical"],
			required: false,
			type: "'horizontal' | 'vertical'"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, displays a required indicator next to the label.",
			name: "required",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "Primary label or label displayed when unchecked (Start/Top position).",
			name: "uncheckedLabel",
			options: ManifestUtils.getMappedParameterOptions(["Off"]),
			required: false,
			type: "ReactNode"
		},
		{
			control: "select",
			description: "An icon displayed inside the moving thumb when the switch is off.",
			name: "uncheckedIcon",
			options: ManifestUtils.getIconParameterOptions([
				{ name: "check" },
				{ name: "moon", asElement: true, label: "moon (Element)", iconProps: {size: "1rem"} },
				{ name: "sun" }
			]),
			required: false,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "select",
			defaultValue: "thumb-icon",
			description: "Visual style for icon placement.",
			name: "variant",
			options: ManifestUtils.getMappedParameterOptions(["thumb-icon", "track-icon", "minimal"]),
			required: false,
			type: "'thumb-icon' | 'track-icon' | 'minimal'"
		}
	],
	status: "unstable"
};

export default SwitchManifest;
