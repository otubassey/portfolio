"use client";

import { Typography, TypographyProps } from "@otuekong-portfolio/design-system";

interface IdentityProps {
	captionProps?: Partial<TypographyProps>;
	name?: string;
	role?: string;
	titleProps?: Partial<TypographyProps>;
}

function Identity({
	captionProps,
	name,
	role,
	titleProps,
}: IdentityProps) {
	return (
		<>
			<Typography
				{...titleProps}
				className="font-bold text-gray-900 dark:text-white truncate w-full"
				component="span"
				variant="subtitle2">
				{name ?? "Unnamed User"}
			</Typography>
			<Typography
				{...captionProps}
				className="text-gray-600 dark:text-gray-400 w-full"
				variant="caption">
				{role ?? "No role specified"}
			</Typography>
		</>
	);
};

export default Identity;
