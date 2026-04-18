import { ComponentCategory, ComponentName } from "../../constants";
import { ComponentManifest } from "../types";

import Surface, { SurfaceProps } from "./surface";

const SurfaceManifest: ComponentManifest<SurfaceProps<any>> = {
	category: ComponentCategory.LAYOUT,
	codeExamples: [
		{
			code: `<Surface elevation={3} className="p-6">\n  Content inside a raised surface\n</Surface>`,
			title: "Raised Surface Container"
		},
		{
			code: `<Surface component="section" outlined rounded>\n  A flat, bordered section\n</Surface>`,
			title: "Polymorphic Outlined Surface"
		}
	],
	component: Surface,
	description: "A polymorphic foundation component that manages elevation (shadows), borders, and rounding. Serves as the structural base for Cards, Sections, and Modals.",
	name: ComponentName.SURFACE,
	parameters: [
		{
			control: "readonly",
			description: "The content to be rendered inside the surface container.",
			name: "children",
			required: false,
			type: "ReactNode",
			value: "Content inside the surface container"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom styling, padding, or layout overrides.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "div",
			description: "The underlying HTML element or React component to render (e.g., 'section', 'article', 'aside').",
			name: "component",
			options: ["div", "section", "article", "aside"],
			required: false,
			type: "ElementType"
		},
		{
			control: "select",
			defaultValue: 1,
			description: "Determines the shadow depth using a scale from 0 (flat) to 6 (deepest). Maps to Tailwind shadow utilities.",
			name: "elevation",
			options: [
				{ label: "0 (flat)", value: 0 },
				{ label: "1", value: 1 },
				{ label: "2", value: 2 },
				{ label: "3", value: 3 },
				{ label: "4", value: 4 },
				{ label: "5", value: 5 },
				{ label: "6", value: 6 },
				{ label: "7 (Invalid value)", value: 7 }
			],
			required: false,
			type: "0 | 1 | 2 | 3 | 4 | 5 | 6"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, adds a subtle border to the surface. Useful for low-elevation components in light/dark modes.",
			name: "outlined",
			required: false,
			type: "boolean"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "If true, adds the default 'rounded-xl' corners.",
			name: "rounded",
			required: false,
			type: "boolean"
		}
	],
	status: "unstable"
};

export default SurfaceManifest;
