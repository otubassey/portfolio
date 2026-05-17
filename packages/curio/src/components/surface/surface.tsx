"use client";

import { ComponentPropsWithRef, ElementType, ReactNode, Ref } from "react";

import { CssUtils } from "../../utils";

const ELEVATION_CLASSES: Record<number, string> = {
	0: "shadow-none",
	1: "shadow-sm",
	2: "shadow",
	3: "shadow-md",
	4: "shadow-lg",
	5: "shadow-xl",
	6: "shadow-2xl"
};

const SHADE_CLASSES = {
	dark: "bg-[var(--portfolio-surface-bg-dark)]",
	light: "bg-[var(--portfolio-surface-bg-light)]",
	main: "bg-[var(--portfolio-surface-bg-main)]"
} as const;

export interface SurfaceOwnProps<T extends ElementType> {
	children?: ReactNode;
	className?: string;
	component?: T;
	elevation?: keyof typeof ELEVATION_CLASSES;
	outlined?: boolean;
	ref?: Ref<any>;
	rounded?: boolean;
	shade?: "main" | "light" | "dark";
}

export type SurfaceProps<T extends ElementType> = SurfaceOwnProps<T>
	& Omit<ComponentPropsWithRef<T>, keyof SurfaceOwnProps<T>>;

const Surface = <T extends ElementType = "div">({
	children,
	className,
	component,
	elevation = 1,
	outlined = false,
	ref,
	rounded = false,
	shade = "main",
	...props
}: SurfaceProps<T>) => {
	const Renderable = (component || "div") as ElementType;
	const validElevation = Math.max(0, Math.min(6, elevation)) as keyof typeof ELEVATION_CLASSES;

	return (
		<Renderable
			ref={ref}
			className={CssUtils.mergeClasses(
				"transition-shadow duration-200",
				"text-gray-900 dark:text-gray-50",
				ELEVATION_CLASSES[validElevation],
				SHADE_CLASSES[shade],
				outlined && "border border-[var(--portfolio-surface-border)]",
				rounded && "rounded-xl",
				className
			)}
			{...props}>
			{children}
		</Renderable>
	);
};

Surface.displayName = "Surface";

export default Surface;
