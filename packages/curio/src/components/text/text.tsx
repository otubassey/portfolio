"use client";

import { Ref } from "react";

import { Typography, TypographyProps } from "../typography";

export interface TextProps extends Omit<TypographyProps, "variant"> {
	muted?: boolean;
	ref?: Ref<HTMLElement>;
	size?: "small" | "large";
}

const Text = ({
	color,
	muted = false,
	ref,
	size: sizeProp,
	...props
}: TextProps) => {
	const textColor = muted ? "muted" : color;
	const size = sizeProp || "large";
	const variant = size === "small" ? "body2" : "body1";

	return (
		<Typography
			ref={ref}
			color={textColor}
			variant={variant}
			{...props}
		/>
	);
};

Text.displayName = "Text";

export default Text;
