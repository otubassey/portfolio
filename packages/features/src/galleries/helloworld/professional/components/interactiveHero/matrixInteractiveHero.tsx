"use client";

import { useState } from "react";

import { Icon, useSetInterval } from "@otuekong-portfolio/curio";

import { HELLO_WORLD_LANGUAGES } from "./constants";

const MATRIX_CHARACTERS = HELLO_WORLD_LANGUAGES
	.map(helloWorldLanguage => helloWorldLanguage.lang.toUpperCase())
	.join("");

export type MatrixCharacters = {
	x: number;
	y: number;
	characters: string;
};

interface MatrixInteractiveHeroProps {}

const MatrixInteractiveHero = ({}: MatrixInteractiveHeroProps) => {
	const [matrixChars, setMatrixChars] = useState<Array<MatrixCharacters>>([]);

	useSetInterval(() => (
		setMatrixChars((prev) => [
			...prev.map(c => ({ ...c, y: c.y + 1 })).filter(c => c.y < 25),
			...(Math.random() > 0.7
				? [{
					x: Math.floor(Math.random() * 25),
					y: 0,
					characters: MATRIX_CHARACTERS[Math.floor(Math.random() * MATRIX_CHARACTERS.length)]
				}]
				: [])
		])
	), 100);

	return (
		<div className="relative min-h-[450px] flex flex-col">
			<div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-black rounded-2xl border border-green-900/30">
				{matrixChars.map((matrixChar, index) => (
				<div
					key={index}
					className="absolute text-green-500 font-mono text-xs transition-all duration-300 ease-linear"
					style={{
						left: `${matrixChar.x * 4}%`,
						top: `${matrixChar.y * 4}%`,
						textShadow: "0 0 8px rgba(34, 197, 94, 0.8)"
					}}>
					{matrixChar.characters}
				</div>
				))}
			</div>

			<div className="relative z-10 flex flex-col items-center justify-center flex-1 bg-black/60 backdrop-blur-[2px] rounded-2xl p-8">
				<Icon
					className="text-green-500 mb-8 animate-pulse"
					name="sparkles"
					size={64}
				/>
			</div>
		</div>
	);
}

MatrixInteractiveHero.displayName = "MatrixInteractiveHero";

export default MatrixInteractiveHero;
