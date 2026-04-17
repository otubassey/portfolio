"use client";

import {ElementType} from "react";

import { CssUtils } from "../../utils";

import { Surface, SurfaceProps } from "../surface";

export type CardProps<T extends ElementType = "div"> = SurfaceProps<T> & {
	raised?: boolean;
};

const Card = <T extends ElementType = "div">({
	className,
	component,
	elevation,
	outlined = false,
	raised = false,
	ref,
	...props
}: CardProps<T>) => {
	const effectiveElevation = elevation ?? (raised ? 4 : 1);
	return (
		<Surface
			ref={ref}
			className={CssUtils.mergeClasses(
				"flex flex-col ease-out",
				raised && "-translate-y-1 scale-[1.01]",
				className
			)}
			component={component || "div"}
			elevation={effectiveElevation}
			outlined={outlined}
			{...(props as any)}
		/>
	);
}

Card.displayName = "Card";

export default Card;
