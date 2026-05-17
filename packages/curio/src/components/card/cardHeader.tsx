"use client";

import { HTMLAttributes, Ref } from "react";

import { CssUtils } from "../../utils";

import { Heading, HeadingProps } from "../heading";

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
	headingProps?: Partial<HeadingProps>;
	ref?: Ref<HTMLDivElement>;
	title?: string;
}

const CardHeader = ({
	children,
	className,
	headingProps,
	ref,
	title,
	...props
}: CardHeaderProps) => {
	return (
		<div
			ref={ref}
			className={CssUtils.mergeClasses("flex flex-col gap-1", className)}
			{...props}>

			{title && (
			<Heading {...headingProps}>
				{title}
			</Heading>
			)}

			{children && (
			<div className="flex-1">
				{children}
			</div>
			)}

		</div>
	);
};

CardHeader.displayName = "CardHeader";

export default CardHeader;
