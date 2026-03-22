"use client";

import { HTMLAttributes } from "react";

import { CssUtils, Icon, IconName, Typography } from "@otuekong-portfolio/design-system";

import EditorHighlighter from "./editorHighlighter";

const ConsoleFrameVariant = {
	EDITOR: "editor",
	TERMINAL: "terminal",
	WINDOW: "window"
} as const;

type ConsoleFrameVariants = typeof ConsoleFrameVariant[keyof typeof ConsoleFrameVariant];

const ICON_NAME_BY_VARIANT: Record<ConsoleFrameVariants, IconName> = {
	[ConsoleFrameVariant.EDITOR]: "code",
	[ConsoleFrameVariant.TERMINAL]: "terminal",
	[ConsoleFrameVariant.WINDOW]: "globe"
} as const;

const ICON_NAME_CLASSNAME_BY_VARIANT: Record<ConsoleFrameVariants, string> = {
	[ConsoleFrameVariant.EDITOR]: "text-purple-500",
	[ConsoleFrameVariant.TERMINAL]: "text-green-500",
	[ConsoleFrameVariant.WINDOW]: "text-blue-500 animate-pulse"
} as const;

interface ConsoleFrameProps {
	code: string;
	displayProps?: HTMLAttributes<HTMLDivElement>;
	fileName?: string;
	language?: string;
	variant?: ConsoleFrameVariants;
}

const ConsoleFrame = ({
	code,
	displayProps,
	fileName,
	language = "TypeScript",
	variant = "window",
}: ConsoleFrameProps) => {
	const isTerminal = variant === "terminal";
	const isEditor = variant === "editor";

	const lines = code.split("\n");

	return (
		<div className="relative w-full">
			{/* Dynamic Top Icon */}
			<div className="flex items-center justify-center mb-8">
				<Icon 
					name={ICON_NAME_BY_VARIANT[variant]}
					className={ICON_NAME_CLASSNAME_BY_VARIANT[variant]}
					size={64}
				/>
			</div>

			<div
				className={CssUtils.mergeClasses(
					"rounded-xl p-6 shadow-2xl border border-gray-700 mb-8 min-h-[300px] max-w-2xl mx-auto overflow-hidden",
					isEditor ? "bg-[#1e1e1e]" : "bg-gray-900"
				)}
				{...displayProps}>

				{/* Unified Header */}
				<div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-4">
					{variant === "window" && (
					<div className="flex items-center gap-1.5">
						<div aria-hidden="true" className="w-3 h-3 rounded-full bg-red-500" />
						<div aria-hidden="true" className="w-3 h-3 rounded-full bg-yellow-500" />
						<div aria-hidden="true" className="w-3 h-3 rounded-full bg-green-500" />
						<Typography
							className="ml-4 text-gray-400 font-mono uppercase tracking-widest"
							variant="caption">
							{language}
						</Typography>
					</div>
					)}
					{isTerminal && (
					<Typography
						aria-label={`Terminal file: ${fileName || "script.sh"}`}
						className="ml-4 text-gray-500 font-mono italic"
						variant="caption">
						bash — {fileName || "script.sh"}
					</Typography>
					)}
					{isEditor && (
					<Typography
						className="text-gray-400 font-mono"
						variant="caption">
						{fileName || "engineer.ts"}
					</Typography>
					)}
				</div>

				{/* Row-Based Code Content */}
				<pre className="text-sm font-mono whitespace-pre-wrap break-words">
					<code className="block">
						{lines.map((line, index) => (
							<div 
								key={index} 
								className="flex gap-4 min-h-[1.5rem] group">
								{/* Line Numbers: Integrated into the row for sync */}
								{isEditor && (
								<span 
									aria-hidden="true"
									className="select-none text-gray-600 text-right min-w-[1.5rem] border-r border-gray-800 pr-4 shrink-0">
									{index + 1}
								</span>
								)}

								{/* Code Line Content */}
								<div
									className={CssUtils.mergeClasses(
										"flex-1 whitespace-pre-wrap break-words",
										!isEditor && "text-green-400 leading-relaxed"
									)}>
									{isEditor
									? (
										<EditorHighlighter line={line} />
									) : (
										line
									)}

									{/* Cursor: Appears only on the last line during typing */}
									{index === lines.length - 1 && (
									<span
										aria-hidden="true"
										className={CssUtils.mergeClasses(
											"inline-block w-2 h-4 ml-1 align-middle animate-pulse",
											isEditor ? "bg-white/50" : "bg-green-400"
										)}
									/>
									)}
								</div>
							</div>
						))}
					</code>
				</pre>
			</div>
		</div>
	);
};

export default ConsoleFrame;
