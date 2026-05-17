import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import Link, { LinkProps } from "./link";

const LinkManifest: ComponentManifest<LinkProps> = {
	category: ComponentCategory.NAVIGATION,
	codeExamples: [
		{
			code: `<Link href="https://github.com">GitHub Profile</Link>`,
			title: "External Link (Auto Security)"
		},
		{
			code: `<Link href="mailto:support@example.com" color="inherit">Email Support</Link>`,
			title: "System Protocol Link"
		}
	],
	component: Link,
	description: "A versatile navigation component that handles internal routing, external links (with automatic security attributes), and system protocols like mailto and tel.",
	name: ComponentName.LINK,
	parameters: [
		{
			control: "select",
			description: "The destination URL or path. External links automatically open in a new tab.",
			name: "href",
			options: [
				{ label: "Google", value: "https://www.google.com" },
				{ label: "Internal Route", value: "/about" }
			],
			required: true,
			type: "string",
			value: "https://www.google.com",
		},
		{
			control: "readonly",
			description: "The content to be displayed within the link.",
			name: "children",
			required: false,
			type: "ReactNode",
			value: "Click here to learn more"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes to apply to the link.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "select",
			defaultValue: "primary",
			description: "The color theme applied to the link text.",
			name: "color",
			options: ManifestUtils.getMappedParameterOptions(["primary", "inherit"]),
			required: false,
			type: "'primary' | 'inherit'"
		},
		{
			control: "select",
			description: "The underlying component or HTML element to render (e.g., 'a' or a Router Link).",
			name: "component",
			options: ManifestUtils.getMappedParameterOptions(["a", "span", "div"]),
			required: false,
			type: "ElementType"
		},
		{
			control: "readonly",
			description: "The native HTML title attribute, also used as a fallback for aria-label.",
			name: "title",
			required: false,
			type: "string",
			value: "Learn more about our services"
		},
		{
			control: "select",
			defaultValue: "hover",
			description: "Determines the decoration behavior of the link text.",
			name: "underline",
			options: ["none", "hover", "always"],
			required: false,
			type: "'none' | 'hover' | 'always'"
		}
	],
	status: "stable"
};

export default LinkManifest;
