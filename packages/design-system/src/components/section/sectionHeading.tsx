"use client";

import { ReactNode, Ref } from "react";

import { Heading, HeadingProps } from "../heading";
import { Typography, TypographyProps } from "../typography";

export interface SectionHeadingProps {
    heading?: ReactNode;
    headingProps?: Omit<HeadingProps, "children">;
	ref?: Ref<HTMLDivElement>;
    subtitle?: ReactNode;
    subtitleProps?: Omit<TypographyProps, "children">;
}

const SectionHeading = ({
    heading,
    headingProps,
	ref,
    subtitle,
    subtitleProps
}: SectionHeadingProps) => {
    if(!heading && !subtitle) return null;

    return (
        <div ref={ref} className="flex flex-col gap-1">
            {typeof heading === "string"
			? (
                <Heading {...headingProps}>
                    {heading}
                </Heading>
            )
			: heading}

            {subtitle && (
			typeof subtitle === "string" ? (
				<Typography
					className="max-w-3xl"
					color="muted"
					variant="body1"
					{...subtitleProps}>
					{subtitle}
				</Typography>
			) : (
				subtitle
			)
            )}
        </div>
    );
};

SectionHeading.displayName = "SectionHeading";

export default SectionHeading;
