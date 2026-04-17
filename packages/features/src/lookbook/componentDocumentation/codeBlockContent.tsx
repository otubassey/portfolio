"use client";

import { type Ref } from "react";

import { CssUtils } from "@otuekong-portfolio/curio";

interface CodeBlockContentProps {
	code: string;
	ref?: Ref<HTMLDivElement>;
}

const CodeBlockContent = ({
	code,
	ref
}: CodeBlockContentProps) => {
	const lines = code.trim().split("\n");

	return (
		<div
			ref={ref}
			className="flex font-mono text-sm leading-relaxed overflow-hidden">

			{/* Sticky Line Numbers */}
			<div
				aria-hidden="true"
				className={CssUtils.mergeClasses(
					"sticky left-0 bg-gray-900 text-gray-600 text-right select-none",
					"border-r border-gray-800 px-4 pt-4 min-w-[3.5rem]"
				)}>
				{lines.map((_, index) => (
					<div key={index}>{index + 1}</div>
				))}
			</div>

			{/* Code Content */}
			<pre className="p-4 text-gray-300 flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700">
				<code>{code.trim()}</code>
			</pre>

		</div>
	);
};

export default CodeBlockContent;
