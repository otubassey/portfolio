"use client";

import ConsoleFrame from "./consoleFrame";
import { CORE_TECHNOLOGIES } from "./constants";
import useTypewriter from "./useTypewriter";

function getCodeSnippet(
	firstName: string,
	passion: string,
	technologies: ReadonlyArray<string>,
	title: string
): string {
	const formattedTechnologies = [
		"[",
		...technologies.map((tech, index) => (`    '${tech}'${index === technologies.length - 1 ? "" : ","}`)),
		"  ]"
	].join("\n");
	return [
		"const engineer = {",
		`  name: '${firstName}',`,
		`  role: '${title}',`,
		`  skills: ${formattedTechnologies},`,
		`  passion: '${passion}'`,
		"};",
	].join("\n");
}

interface CodeEditorConsoleFrameProps {
	firstName: string;
	passion: string;
	title: string;
}

const CodeEditorConsoleFrame = ({
	firstName,
	passion,
	title
}: CodeEditorConsoleFrameProps) => {
	const terminalSource = getCodeSnippet(firstName, passion, CORE_TECHNOLOGIES, title);

	const displayText = useTypewriter(terminalSource, 50, []);

	return (
		<ConsoleFrame
			code={displayText}
			displayProps={{
				"aria-live": "polite",
				role: "log"
			}}
			fileName="engineer.ts"
			variant="editor"
		/>
	);
}

CodeEditorConsoleFrame.displayName = "CodeEditorConsoleFrame";

export default CodeEditorConsoleFrame;
