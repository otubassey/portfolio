import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import ToggleIconButton, { ToggleIconButtonProps } from "./toggleIconButton";

const ToggleIconButtonComponent = ({ ...props }: ToggleIconButtonProps<any>) => (
	<ToggleIconButton
		{...props}
		onToggle={() => {}}
	/>
);

const ToggleIconButtonManifest: ComponentManifest<ToggleIconButtonProps<any>> = {
	category: ComponentCategory.INPUTS,
	codeExamples: [
		{
			code: `<ToggleIconButton \n  checked={isFavorite} \n  icon="heart-outline" \n  checkedIcon="heart" \n  onToggle={setIsFavorite} \n/>`,
			title: "Favorite Toggle"
		},
		{
			code: `<ToggleIconButton \n  checked={isMuted} \n  icon="audio-base" \n  checkedIcon="audio-active" \n  color="error" \n  onToggle={setIsMuted} \n/>`,
			title: "Mute State Toggle"
		}
	],
	component: ToggleIconButtonComponent,
	description: "An icon-only button that maintains a binary state, swapping its visual icon and 'aria-pressed' attribute based on the checked property.",
	extends: [ComponentName.ICON_BUTTON],
	name: ComponentName.TOGGLE_ICON_BUTTON,
	parameters: [
		{
			control: "select",
			description: "The icon to display when the component is in its active (checked) state.",
			name: "checkedIcon",
			options: ManifestUtils.getIconParameterOptions([
				{name: "check"},
				{name: "close", asElement: true, label: "close (Element)"},
				{name: "chevron-down"},
				{name: "chevron-up", asElement: true, label: "chevron-up (Element)"},
			]),
			required: true,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "select",
			description: "The default icon to display when the component is inactive (unchecked).",
			name: "icon",
			options: ManifestUtils.getIconParameterOptions([
				{name: "check", asElement: true, label: "check (Element)"},
				{name: "close"},
				{name: "chevron-down", asElement: true, label: "chevron-down (Element)"},
				{name: "chevron-up"},
			]),
			required: true,
			type: `ReactNode | ${ManifestUtils.getIconNames()}`
		},
		{
			control: "none",
			description: "Callback function triggered when the toggle is clicked. Returns the inverse of the current checked state.",
			name: "onToggle",
			required: true,
			type: "function"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "The current state of the toggle. If true, the checkedIcon is displayed.",
			name: "checked",
			required: false,
			type: "boolean"
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
			control: "none",
			description: "Standard click event handler, executed before the state toggle logic.",
			name: "onClick",
			required: false,
			type: "function"
		}
	],
	status: "unstable"
};

export default ToggleIconButtonManifest;
