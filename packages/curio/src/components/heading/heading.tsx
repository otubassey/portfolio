"use client";

import { FC, HTMLAttributes, Ref } from "react";

import { Typography, TypographyProps } from "../typography";

import { useHeadingLevel } from "./headingLevelContext";

// TODO: Ensure headings work as intended - hieriarchy
export interface HeadingProps
	extends Omit<HTMLAttributes<HTMLHeadingElement>, "children" | "color" | "onMouseEnter" | "onMouseLeave">,
	Omit<TypographyProps, "component" | "variant"> {
	id?: string;
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	ref?: Ref<HTMLHeadingElement>;
}

const Heading: FC<HeadingProps> = ({
	id,
	level: manualLevel,
	ref,
	...props
}: HeadingProps) => {
	const contextLevel = useHeadingLevel();

	const level = manualLevel ?? contextLevel;
	const component = `h${level}` as const;
	const variant = `h${level}` as const;

  	return <Typography ref={ref} id={id} variant={variant} component={component} {...props} />;
};

Heading.displayName = "Heading";

export default Heading;
