import { ComponentCategory, ComponentName } from "../../constants";
import { ComponentManifest } from "../types";

import Tab, { TabProps } from "./tab";

const TabManifest: ComponentManifest<TabProps> = {
	category: ComponentCategory.NAVIGATION,
	codeExamples: [
		{
			code: `<Tab isSelected={activeTab === 'profile'} onClick={() => setTab('profile')}>\n  Profile\n</Tab>`,
			title: "Individual Active Tab"
		}
	],
	component: Tab,
	description: "An individual navigation item used within a TabList, providing semantic accessibility roles and selection state styling.",
	extends: [ComponentName.BUTTON_BASE],
	name: ComponentName.TAB,
	parameters: [
		{
			control: "readonly",
			description: "The content to be rendered inside the tab button, typically a string or an Icon.",
			name: "children",
			required: true,
			type: "ReactNode",
			value: "Tab Label"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom width, padding, or text alignment.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Determines if the tab is currently active. Applies high-contrast styling and sets the 'aria-selected' attribute.",
			name: "isSelected",
			required: false,
			type: "boolean"
		},
		{
			control: "none",
			description: "Callback function executed when the tab is clicked.",
			name: "onClick",
			required: false,
			type: "function"
		}
	],
	status: "unstable"
};

export default TabManifest;
