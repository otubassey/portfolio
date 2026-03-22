"use client";

import { Card } from "../../components";

function generateCode(componentName: string, props: Record<string, any>): string {
	const propsString = Object.entries(props)
		.map(([key, value]) => {
		if (typeof value === 'string') return `${key}="${value}"`;
		if (typeof value === 'boolean') return value ? key : `${key}={false}`;
		return `${key}={${JSON.stringify(value)}}`;
		})
		.join('\n  ');

	return `<${componentName}\n  ${propsString}\n/>`;
}

interface CodePreviewProps {
	componentName: string;
	props: Record<string, any>;
	code?: string;
}

function CodePreview({ componentName, props, code }: CodePreviewProps) {
	// Generate code from props
	const generatedCode = code || generateCode(componentName, props);

	const handleCopy = () => {
		navigator.clipboard.writeText(generatedCode);
	};

	return (
		<Card className="p-0 overflow-hidden">
			<div className="flex justify-between items-center bg-gray-800 px-4 py-2">
				<span className="text-sm font-mono text-gray-300">JSX</span>
				<button
					onClick={handleCopy}
					className="text-sm text-blue-400 hover:text-blue-300"
					>
					Copy
				</button>
			</div>
			<pre className="p-4 bg-gray-900 text-gray-100 overflow-x-auto">
				<code>{generatedCode}</code>
			</pre>
		</Card>
	);
}

export default CodePreview;
