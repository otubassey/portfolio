"use client";

import { FC, Ref } from "react";

import { Typography, TypographyProps } from "../typography";

export interface LabelProps extends Omit<TypographyProps, "component" | "variant"> {
	htmlFor?: string;
	ref?: Ref<HTMLElement>;
	required?: boolean;
}

const Label: FC<LabelProps> = ({
	children,
	className,
	color = "default",
	ref,
	required = false,
	...props
}: LabelProps) => {
  	return (
		<Typography
			ref={ref}
			color={color}
			component="label"
			variant="subtitle2"
			weight="medium"
			{...props}>
			{children}
			{required && (
			<Typography
				aria-hidden="true"
				className="ml-1"
				color="error"
				component="span"
				variant="caption">
				*
			</Typography>
			)}
		</Typography>
	);
};

Label.displayName = "Label";

export default Label;
