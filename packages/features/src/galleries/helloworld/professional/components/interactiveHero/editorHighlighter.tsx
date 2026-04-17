"use client";

interface EditorHighlighterProps {
	line: string;
}

const EditorHighlighter = ({ line }: EditorHighlighterProps) => {
	// Tokenizes the string while capturing delimiters like quotes and brackets
	const tokens = line.split(/(\s+|['"].*?['"]|[{}:,[\]])/);

	return (
		<>
			{tokens.map((part, j) => {
				// String Literals
				if(/['"].*?['"]/.test(part)) {
					return <span key={j} className="text-yellow-700">{part}</span>;
				}
				// Structural Syntax (Brackets, colons, etc)
				if(/[{}]/.test(part)) {
					return <span key={j} className="text-yellow-400">{part}</span>;
				}
				if(/[[\]]/.test(part)) {
					return <span key={j} className="text-purple-400">{part}</span>;
				}
				// Keywords & Domain terms
				if(/(const)/.test(part)) {
					return <span key={j} className="text-purple-400">{part}</span>;
				}
				// Default Text / Variables
				return <span key={j} className="text-blue-300">{part}</span>;
			})}
		</>
	);
};

EditorHighlighter.displayName = "EditorHighlighter";

export default EditorHighlighter;
