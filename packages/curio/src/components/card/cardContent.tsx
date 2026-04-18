"use client";

import { ComponentPropsWithRef, ElementType, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

export interface CardContentOwnProps<T extends ElementType> {
	children?: ReactNode;
	className?: string;
	component?: T;
	ref?: Ref<any>;
}

export type CardContentProps<T extends ElementType> = CardContentOwnProps<T> &
	Omit<ComponentPropsWithRef<T>, keyof CardContentOwnProps<T>>;

const CardContent = <T extends ElementType = "div">({
	className,
	component,
	ref,
	...props
}: CardContentProps<T>) => {
	const Renderable = (component || "div") as ElementType;

	return (
		<Renderable
			ref={ref}
			className={CssUtils.mergeClasses(
				"leading-relaxed text-slate-600 dark:text-slate-400",
				className
			)}
			{...(props as any)}
		/>
	);
};

CardContent.displayName = "CardContent";

export default CardContent;
