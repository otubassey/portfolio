import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import Collapse, { CollapseProps } from "./collapse";

const CollapseComponent = ({ ...props }: CollapseProps) => (
	<Collapse {...props}>
		<div className="p-4 bg-gray-100 border rounded">
			<p>This content expands and collapses vertically.</p>
		</div>
	</Collapse>
);

const CollapseManifest: ComponentManifest<CollapseProps> = {
	category: ComponentCategory.FEEDBACK,
	codeExamples: [
		{
			code: `<Collapse in={isOpen}>\n  <Typography>This content expands and collapses vertically.</Typography>\n</Collapse>`,
			title: "Basic Vertical Collapse"
		},
		{
			code: `<Collapse in={isOpen} orientation="horizontal" collapsedSize={40}>\n  <div className="w-64 bg-blue-500 h-10" />\n</Collapse>`,
			title: "Horizontal Partial Collapse"
		}
	],
	component: CollapseComponent,
	description: "A transition container that animates the height or width of its children. Useful for accordions, mobile menus, or revealing additional details.",
	name: ComponentName.COLLAPSE,
	parameters: [
		{
			control: "none",
			description: "The content to be animated. Note: Children should have a stable height/width for smooth transitions.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom transition durations or easing functions.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, the component expands to reveal its children. If false, it shrinks to the collapsedSize.",
			name: "expand",
			required: false,
			type: "boolean"
		},
		({expand, orientation}) => ({
			control: (!expand && orientation === "vertical") ? "select" : "none",
			defaultValue: 0,
			description: "The fixed dimension (height for vertical, width for horizontal) of the container when 'in' is false.",
			name: "collapsedSize",
			options: [
				{ label: "0 (fully collapsed)", value: 0 },
				{ label: "20px", value: "20px" },
				{ label: "40px", value: "40px" },
				{ label: "60px (number value)", value: 60 },
				{ label: "80px (number value)", value: 80 }
			],
			required: false,
			type: "string | number"
		}),
		{
			control: "select",
			defaultValue: "vertical",
			description: "Determines the axis of the transition animation.",
			name: "orientation",
			options: ["horizontal", "vertical"],
			required: false,
			type: "'horizontal' | 'vertical'"
		}
	],
	status: "unstable"
};

export default CollapseManifest;
