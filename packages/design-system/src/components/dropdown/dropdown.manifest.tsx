import { ComponentCategory, ComponentName } from "../../constants";

import { MenuItem } from "../menuItem";
import { ComponentManifest } from "../types";

import Dropdown, { DropdownProps } from "./dropdown";

const DropdownComponent = ({ ...props }: DropdownProps) => {
	return (
		<Dropdown {...props}>
			<MenuItem value="profile">Profile</MenuItem>
			<MenuItem value="settings">Settings</MenuItem>
			<MenuItem value="logout" color="error">Logout</MenuItem>
		</Dropdown>
	);
};

const DropdownManifest: ComponentManifest<DropdownProps> = {
	category: ComponentCategory.NAVIGATION,
	codeExamples: [
		{
			title: "Standard Menu",
			code: `
<Dropdown label="Account">
  <MenuItem value="profile">Profile</MenuItem>
  <MenuItem value="settings">Settings</MenuItem>
  <MenuItem value="logout" color="error">Logout</MenuItem>
</Dropdown>`
		},
		{
			title: "Select Variant",
			code: `
<Dropdown
  label="Choose Theme"
  variant="select"
  onChange={(val) => console.log(val)}
>
  <MenuItem value="light">Light Mode</MenuItem>
  <MenuItem value="dark">Dark Mode</MenuItem>
</Dropdown>`
		}
	],
	component: DropdownComponent,
	description: "A versatile overlay component that can act as a navigation menu or a selection input. Features full keyboard accessibility (Arrow keys, Enter, Esc) and ARIA compliance.",
	name: ComponentName.DROPDOWN,
	parameters: [
		{
			control: "none",
			description: "The content of the dropdown menu, typically a list of MenuItem components.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "The content displayed on the trigger button.",
			name: "label",
			required: true,
			type: "ReactNode",
			value: "Options"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Additional props to pass to the trigger button element.",
			name: "buttonProps",
			required: false,
			type: "object"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for the dropdown container.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Prevents user interaction and visually dims the trigger.",
			name: "disabled",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the trigger button will expand to fill its container width.",
			name: "fullWidth",
			required: false,
			type: "boolean"
		},
		{
			control: "none",
			defaultValue: {},
			description: "Additional props to pass to the menu element.",
			name: "menuProps",
			required: false,
			type: "object"
		},
		{
			control: "none",
			description: "Callback fired when a menu item is selected, receiving the selected value.",
			name: "onClick",
			required: false,
			type: "function"
		},
		{
			control: "select",
			defaultValue: "menu",
			description: "Determines the semantic behavior and ARIA roles (button vs combobox).",
			name: "variant",
			options: ["menu", "select"],
			required: false,
			type: "'menu' | 'select'"
		}
	],
	status: "unstable"
};

export default DropdownManifest;
