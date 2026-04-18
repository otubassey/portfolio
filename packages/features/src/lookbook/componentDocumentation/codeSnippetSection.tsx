"use client";

import { HTMLAttributes, Ref, useState } from "react";

import { ComponentManifest, CopyButton, EditorShell, Section, Tab, Tabs } from "@otuekong-portfolio/curio";

import CodeBlockContent from "./codeBlockContent";

function getCodeSnippetExamples(manifest: ComponentManifest<any> | null) {
	if(manifest) {
		return manifest.codeExamples
			.map(ex => ({
				title: ex.title,
				code: ex.code
			}));
	}
	return [];
}

export interface CodeExample {
	code: string;
	title: string;
	language?: string;
}

export interface CodeSnippetSectionProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
	manifest: ComponentManifest<any>;
	className?: string;
	/**
	 * "tabs": Single shell with a switcher
	 * "stack": Multiple shells stacked vertically
	 */
	layout?: "stack" | "tabs";
	ref?: Ref<HTMLDivElement>;
	title?: string;
}

const CodeSnippetSection = ({
	manifest,
	className,
	layout = "stack",
	ref,
	title: fallbackTitle
}: CodeSnippetSectionProps) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const examples = getCodeSnippetExamples(manifest);
	const exampleList: Array<CodeExample> = typeof examples === "string"
		? [{ title: fallbackTitle || "Code", code: examples }]
		: examples;

	return (
		<Section
			className={className}
			heading="Code Example">

			{layout === "stack" && (
			exampleList.map((example, index) => (
				<EditorShell
					key={`${example.title}-${index}`}
					actions={<CopyButton value={example.code} />}
					title={example.title}>

					<CodeBlockContent code={example.code} />

				</EditorShell>
			))
			)}

			{layout === "tabs" && (
			<EditorShell
				ref={ref}
				actions={<CopyButton value={exampleList[activeTabIndex].code} />}
				title={
					exampleList.length > 1
					? (
						<Tabs activeTab={activeTabIndex} onChange={setActiveTabIndex}>
							{exampleList.map((example, index) => (
								<Tab key={index} className="truncate">{example.title}</Tab>
							))}
						</Tabs>
					)
					: (
						exampleList[0]?.title
					)
				}>

				<CodeBlockContent code={exampleList[activeTabIndex].code} />

			</EditorShell>
			)}

		</Section>
	);
};

export default CodeSnippetSection;
