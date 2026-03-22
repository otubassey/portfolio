import { ComponentCategory, ComponentName } from "../../constants";

import { ComponentManifest } from "../types";

import Footer, { FooterProps } from "./footer";

const FooterManifest: ComponentManifest<FooterProps> = {
	category: ComponentCategory.LAYOUT,
	codeExamples: [
		{
			code: `<Footer className="flex justify-between items-center">\n  <Text muted>© 2024 Your Company</Text>\n  <Link href="/privacy">Privacy Policy</Link>\n</Footer>`,
			title: "Standard Page Footer"
		}
	],
	component: Footer,
	description: "A structural layout component that provides a consistent, bordered container for footer content, supporting dark mode and custom horizontal padding.",
	name: ComponentName.FOOTER,
	parameters: [
		{
			control: "readonly",
			description: "The content to be rendered inside the footer, such as copyright text, links, or logos.",
			name: "children",
			required: false,
			type: "ReactNode",
			value: "© 2024 Your Company | Privacy Policy"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes for custom padding, flex alignment, or height overrides.",
			name: "className",
			required: false,
			type: "string"
		}
	],
	status: "stable"
};

export default FooterManifest;
