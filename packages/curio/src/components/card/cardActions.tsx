"use client";

import { ComponentPropsWithRef, ElementType, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

export interface CardActionsOwnProps<T extends ElementType> {
	children?: ReactNode;
	className?: string;
	component?: T;
	ref?: Ref<any>;
}

export type CardActionsProps<T extends ElementType> = CardActionsOwnProps<T> &
	Omit<ComponentPropsWithRef<T>, keyof CardActionsOwnProps<T>>;

const CardActions = <T extends ElementType = "div">({
	className,
	component,
	ref,
	...props
}: CardActionsProps<T>) => {
	const Renderable = (component || "div") as ElementType;

	return (
		<Renderable
			ref={ref}
			className={CssUtils.mergeClasses("flex items-center p-2 gap-2", className)}
			{...(props as any)}
		/>
	);
};

CardActions.displayName = "CardActions";

export default CardActions;
