"use client";

import { useEffect } from "react";

import { CssUtils, Heading, HeadingProps, IconButton, Text, Typography } from "@otuekong-portfolio/curio";

import { PERSONA_INFO } from "../data";
import { useAudioPlayer } from "../hooks";

export interface SalutationProps extends Omit<HeadingProps, "children"> {
	className?: string;
	orientation?: "horizontal" | "vertical";
	salutation?: string;
}

const Salutation = ({
	className,
	orientation = "horizontal",
	salutation = "I'm",
	...props
}: SalutationProps) => {
	const { isPlaying, play, error } = useAudioPlayer(PERSONA_INFO.name.firstPronunciationAudio);

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
				{`${salutation} ${PERSONA_INFO.name.first} (pronounced ${PERSONA_INFO.name.firstPhonetic})`}
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
						{PERSONA_INFO.name.first}
					</Typography>

					{PERSONA_INFO.name.firstPhonetic && (
					<span className="flex items-center gap-2 text-slate-500 italic lowercase">

						<Text
							aria-hidden="true"
							className="opacity-80"
							component="span">
							{`(${PERSONA_INFO.name.firstPhonetic})`}
						</Text>

						{PERSONA_INFO.name.firstPronunciationAudio && (
						<IconButton
							aria-label={`Listen to pronunciation of ${PERSONA_INFO.name.first}`}
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
