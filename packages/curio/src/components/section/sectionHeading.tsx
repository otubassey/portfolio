"use client";

import { ReactNode, Ref } from "react";

import { Heading, HeadingProps } from "../heading";
import { Typography, TypographyProps } from "../typography";

export interface SectionHeadingProps {
    heading?: ReactNode;
    headingProps?: Omit<HeadingProps, "children">;
	ref?: Ref<HTMLDivElement>;
    subheading?: ReactNode;
    subheadingProps?: Omit<TypographyProps, "children">;
}

const SectionHeading = ({
    heading,
    headingProps,
	ref,
    subheading,
    subheadingProps
}: SectionHeadingProps) => {
    if(!heading && !subheading) return null;

    return (
        <div ref={ref} className="flex flex-col gap-1">
            {typeof heading === "string"
			? (
                <Heading {...headingProps}>
                    {heading}
                </Heading>
            )
			: heading}

            {subheading && (
			typeof subheading === "string" ? (
				<Typography
					className="max-w-3xl"
					color="muted"
					variant="body1"
					{...subheadingProps}>
					{subheading}
				</Typography>
			) : (
				subheading
			)
            )}
        </div>
    );
};

SectionHeading.displayName = "SectionHeading";

export default SectionHeading;
