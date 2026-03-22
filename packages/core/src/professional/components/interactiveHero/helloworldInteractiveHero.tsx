"use client";

import { useState } from "react";

import { useSetInterval } from "@otuekong-portfolio/common";

import ConsoleFrame from "./consoleFrame";
import { HELLO_WORLD_LANGUAGES } from "./constants";

interface HelloWorldInteractiveHeroProps {}

const HelloWorldInteractiveHero = ({}: HelloWorldInteractiveHeroProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	useSetInterval(() => (
		setCurrentIndex((previousCurrentIndex) => (previousCurrentIndex + 1) % HELLO_WORLD_LANGUAGES.length)
	), 3000);

	return (
		<ConsoleFrame
			code={HELLO_WORLD_LANGUAGES[currentIndex].code}
			displayProps={{
				"aria-live": "polite",
				role: "log"
			}}
			language={HELLO_WORLD_LANGUAGES[currentIndex].lang}
			variant="window"
		/>
	);
}

HelloWorldInteractiveHero.displayName = "HelloWorldInteractiveHero";

export default HelloWorldInteractiveHero;
