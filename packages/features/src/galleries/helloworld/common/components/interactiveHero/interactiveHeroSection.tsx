"use client";

import { useState } from "react";

import { CssUtils, Section, Select } from "@otuekong-portfolio/curio";
import {
	HelloworldInteractiveHero,
	MatrixInteractiveHero,
	ProfileCodeEditorInteractiveHero,
	ProfileTerminalInteractiveHero
} from "@otuekong-portfolio/archives";

import { SimpleVariant } from "./variants";

const HEADING_TYPOGRAPHY_PROPS = {
	className: "sm:text-left lg:text-center"
} as const;

const InteractiveHeroVariant = {
	CODE_EDITOR: "code-editor",
	HELLO_WORLD: "hello-world",
	MATRIX: "matrix",
	SIMPLE: "simple",
	TERMINAL: "terminal"
} as const;

type InteractiveHeroVariantType = typeof InteractiveHeroVariant[keyof typeof InteractiveHeroVariant];

const INTERACTIVE_HERO_VIEWS = [
	{
		label: "View: Code Editor",
		value: InteractiveHeroVariant.CODE_EDITOR
	},
	{
		label: "View: Hello World",
		value: InteractiveHeroVariant.HELLO_WORLD
	},
	{
		label: "View: Matrix",
		value: InteractiveHeroVariant.MATRIX
	},
	{
		label: "View: Simple",
		value: InteractiveHeroVariant.SIMPLE
	},
	{
		label: "View: Terminal",
		value: InteractiveHeroVariant.TERMINAL
	}
] as const;

interface InteractiveHeroSectionProps {
	className?: string;
	id?: string;
}

function InteractiveHeroSection({
	className = "",
	id
}: InteractiveHeroSectionProps) {
	const [currentVariant, setCurrentVariant] = useState<InteractiveHeroVariantType>(InteractiveHeroVariant.SIMPLE);

	return (
		<Section
			className={className}
			heading="Live Logic Stream"
			headingProps={HEADING_TYPOGRAPHY_PROPS}
			id={id}
			subtitle="Visualizing the execution flow: Automated scripts and terminal simulations demonstrating syntax patterns across my tech stack."
			subtitleProps={HEADING_TYPOGRAPHY_PROPS}>

			<div className="flex justify-end">
				<Select
					dropdownProps={{
						buttonProps: {
							className: "min-w-[180px]"
						}
					}}
					onChange={(variant) => setCurrentVariant(variant as InteractiveHeroVariantType)}
					options={INTERACTIVE_HERO_VIEWS}
					value={currentVariant}
				/>
			</div>

			<div
				className={CssUtils.mergeClasses(
					"min-h-[500px] flex items-center justify-center transition-colors duration-500",
					"bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
				)}>
				<div className="container mx-auto px-4 max-w-5xl">

					{currentVariant === InteractiveHeroVariant.CODE_EDITOR && (
					<ProfileCodeEditorInteractiveHero />
					)}

					{currentVariant === InteractiveHeroVariant.HELLO_WORLD && (
					<HelloworldInteractiveHero />
					)}

					{currentVariant === InteractiveHeroVariant.MATRIX && (
					<MatrixInteractiveHero />
					)}

					{currentVariant === InteractiveHeroVariant.SIMPLE && (
					<SimpleVariant />
					)}

					{currentVariant === InteractiveHeroVariant.TERMINAL && (
					<ProfileTerminalInteractiveHero />
					)}

				</div>
			</div>

		</Section>
	);
}

export default InteractiveHeroSection;
