"use client";

import { Typography, TypographyProps } from "@otuekong-portfolio/curio";

import { PERSONA_INFO } from "../data";

interface IdentityProps {
	captionProps?: Partial<TypographyProps>;
	titleProps?: Partial<TypographyProps>;
}

function Identity({
	captionProps,
	titleProps
}: IdentityProps) {
	return (
		<>
			<Typography
				{...titleProps}
				className="font-bold text-gray-900 dark:text-white truncate w-full"
				component="span"
				variant="subtitle2">
				{PERSONA_INFO.name.full}
			</Typography>
			<Typography
				{...captionProps}
				className="text-gray-600 dark:text-gray-400 w-full"
				variant="caption">
				{PERSONA_INFO.role}
			</Typography>
		</>
	);
};

Identity.displayName = "Identity";

export default Identity;
