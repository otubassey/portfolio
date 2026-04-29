"use client";

import ConsoleFrame from "./consoleFrame";
import { CORE_TECHNOLOGIES } from "./constants";
import useTypewriter from "./useTypewriter";

function getCodeSnippet(
	firstName: string,
	lastName: string,
	technologies: ReadonlyArray<string>
): string {
	const skillNamesList = technologies.join(", ") + "...";
	return [
		"$ whoami",
		`${firstName} ${lastName}`,
		"$ cat skills.txt",
		skillNamesList,
		"$ ls projects/",
		"portfolio-system  component-playground  mobile-apps",
		"$ echo 'Building amazing things'",
		"Building amazing things",
	].join("\n");
}

interface TerminalConsoleFrameProps {
	firstName: string;
	lastName: string;
}

const TerminalConsoleFrame = ({
	firstName,
	lastName
}: TerminalConsoleFrameProps) => {
	const terminalSource = getCodeSnippet(firstName, lastName, CORE_TECHNOLOGIES);

	const displayText = useTypewriter(terminalSource, 50, []);

	return (
		<ConsoleFrame
			code={displayText}
			displayProps={{
				"aria-live": "polite",
				role: "log"
			}}
			language="bash.sh"
			variant="terminal"
		/>
	);
}

TerminalConsoleFrame.displayName = "TerminalConsoleFrame";

export default TerminalConsoleFrame;
