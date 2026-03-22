"use client";

import { useEffect } from "react";

import { CssUtils, Heading, HeadingProps, IconButton, Text, Typography } from "@otuekong-portfolio/design-system";

import { PersonaInfoAttributes } from "../data";
import { useAudioPlayer } from "../hooks";

export interface SalutationProps extends Omit<HeadingProps, "children"> {
	name: PersonaInfoAttributes["name"];
	className?: string;
	orientation?: "horizontal" | "vertical";
	salutation?: string;
}

const Salutation = ({
	name,
	className,
	orientation = "horizontal",
	salutation = "I'm",
	...props
}: SalutationProps) => {
	const { isPlaying, play, error } = useAudioPlayer(name.firstPronunciationAudio);

	useEffect(() => {
		if(error) {
			console.warn("[Salutation] Audio playback failed:", error.message);
		}
	}, [error]);

	return (
		<Heading
			className={CssUtils.mergeClasses(
				"flex",
				orientation === "horizontal"
					? "flex-row items-baseline gap-x-2"
					: "flex-col gap-y-3",
				className
			)}
			level={1}
			{...props}>

			<Typography
				className="sr-only"
				variant="caption">
				{`${salutation} ${name.first} (pronounced ${name.firstPhonetic})`}
			</Typography>

			<span className="flex flex-col gap-y-3">

				<Typography
					aria-hidden="true"
					className="font-medium"
					color="secondary"
					component="span"
					variant="h2">
					{salutation}
				</Typography>

				<span className="flex flex-col items-baseline">

					<Typography
						aria-hidden="true"
						component="span"
						variant="h1">
						{name.first}
					</Typography>

					{name.firstPhonetic && (
					<span className="flex items-center gap-2 text-slate-500 italic lowercase">

						<Text
							aria-hidden="true"
							className="opacity-80"
							component="span">
							{`(${name.firstPhonetic})`}
						</Text>

						{name.firstPronunciationAudio && (
						<IconButton
							aria-label={`Listen to pronunciation of ${name.first}`}
							icon={isPlaying ? "audio-active" : "audio-base"}
							onClick={play}
							size="small"
							variant="ghost"
						/>
						)}

					</span>
					)}

				</span>
			</span>
		</Heading>
	);
};

Salutation.displayName = "Salutation";

export default Salutation;
