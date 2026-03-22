import { ComponentCategory, ComponentName } from "../../constants";

import { Tab } from "../tab";
import { ComponentManifest } from "../types";

import Tabs, { TabsProps } from "./tabs";

const TabsComponent = ({...props }: TabsProps) => (
	<Tabs {...props} onChange={() => {}}>
		<Tab>Tab 1</Tab>
		<Tab>Tab 2</Tab>
		<Tab>Tab 3</Tab>
	</Tabs>
);

const TabsManifest: ComponentManifest<TabsProps> = {
	category: ComponentCategory.NAVIGATION,
	codeExamples: [
		{
			code: `<Tabs activeTab={index} onChange={setIndex}>\n  <Tab>Overview</Tab>\n  <Tab>Settings</Tab>\n  <Tab>Billing</Tab>\n</Tabs>`,
			title: "Managed Tabs Group"
		}
	],
	component: TabsComponent,
	description: "A navigational container that manages selection state for a group of Tab components, automatically handling active indices and horizontal scroll overflow.",
	name: ComponentName.TABS,
	parameters: [
		{
			control: "select",
			description: "The zero-based index of the currently active tab.",
			name: "activeTab",
			options: [
				{label: "Tab 1", value: 0},
				{label: "Tab 2", value: 1},
				{label: "Tab 3", value: 2},
				{label: "Tab 4 (non-existent)", value: 4},
				{label: "None", value: ""}
			],
			required: true,
			type: "number",
			value: 0
		},
		{
			control: "none",
			description: "A collection of Tab components. These will automatically receive selection and click props from the parent.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Callback function triggered when a child tab is clicked. Returns the index of the selected tab.",
			name: "onChange",
			required: true,
			type: "function"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom spacing, alignment, or container padding.",
			name: "className",
			required: false,
			type: "string"
		}
	],
	status: "unstable"
};

export default TabsManifest;
