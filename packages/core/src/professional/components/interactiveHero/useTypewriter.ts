"use client";

import { useEffect, useState } from "react";

import { useSetInterval } from "@otuekong-portfolio/common";

function useTypewriter(
	source: string | Array<string>,
	speed: number | null | undefined | false,
	dependencies: Array<any> = []
) {
	const [displayText, setDisplayText] = useState("");
	const defaultedDependencies = dependencies || [];

	useEffect(() => {
		setDisplayText("");
	}, defaultedDependencies);

  	const chars = Array.isArray(source) ? source : source.split("");

	useSetInterval(() => {
		const currentLength = displayText.length;
		if(currentLength < chars.length) {
			const nextChar = chars[currentLength];
			setDisplayText((prev) => prev + nextChar);
		}
	}, displayText.length < chars.length && speed);

  	return displayText;
}

export default useTypewriter;
