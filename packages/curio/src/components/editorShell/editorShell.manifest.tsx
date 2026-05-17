import { ComponentCategory, ComponentName } from "../../constants";
import { ManifestUtils } from "../../utils";

import { ComponentManifest } from "../types";

import EditorShell, { EditorShellProps } from "./editorShell";

const EditorShellComponent = ({ ...props }: EditorShellProps) => (
	<EditorShell {...props}>
		<div className="p-4 text-white">
			This is an example of the EditorShell component. You can place any content here, such as code snippets, terminal output, or custom layouts.
		</div>
	</EditorShell>
);

const EditorShellManifest: ComponentManifest<EditorShellProps> = {
	category: ComponentCategory.LAYOUT,
	codeExamples: [
		{
			title: "Code Snippet View",
			code: `
<EditorShell title="hello-world.js" variant="editor">
  <pre className="p-4 text-white">
    <code>console.log("Hello World");</code>
  </pre>
</EditorShell>`
		},
		{
			title: "Shell with Actions",
			code: `
<EditorShell
  title="Terminal"
  actions={<CopyButton size="sm" value="npm install" />}
>
  <div className="p-4 font-mono text-green-400">
    $ npm install tailwindcss
  </div>
</EditorShell>`
		},
		{
			title: "No Window Controls",
			code: `
<EditorShell showDots={false} title="Plain Container">
  <div className="p-6 text-gray-300">
    Content without window decorations.
  </div>
</EditorShell>`
		}
	],
	component: EditorShellComponent,
	description: "A wrapper component that mimics the appearance of a code editor or terminal window, featuring window controls, a title bar, and customizable actions.",
	name: ComponentName.EDITOR_SHELL,
	parameters: [
		{
			control: "none",
			description: "The main content to be displayed inside the shell.",
			name: "children",
			required: true,
			type: "ReactNode"
		},
		{
			control: "select",
			description: "Slot for action buttons or icons on the right side of the title bar.",
			name: "actions",
			options: ManifestUtils.getIconParameterOptions([
				{name: "copy", label: "Copy Icon", asElement: true},
				{name: "close", label: "Close Icon", asElement: true}
			]),
			required: false,
			type: "ReactNode"
		},
		{
			control: "none",
			description: "Additional Tailwind CSS classes to apply to the root container for custom styling.",
			name: "className",
			required: false,
			type: "string"
		},
		{
			control: "switch",
			defaultValue: false,
			description: "Toggles the visibility of the red/yellow/green window control dots.",
			name: "hideDots",
			required: false,
			type: "boolean"
		},
		{
			control: "select",
			description: "Label or filename displayed in the center of the title bar.",
			name: "title",
			required: false,
			type: "ReactNode",
			options: [
				{ label: "String Title", value: "index.tsx" },
				{ label: "Path Style", value: "src/components/Editor.ts" }
			]
		},
		{
			control: "select",
			description: "The background color style of the shell body.",
			name: "variant",
			required: false,
			type: "'dark' | 'editor'",
			defaultValue: "dark",
			options: [
				{ label: "Dark (Gray-900)", value: "dark" },
				{ label: "Editor (VSCode Style)", value: "editor" }
			]
		}
	],
	status: "stable"
};

export default EditorShellManifest;
