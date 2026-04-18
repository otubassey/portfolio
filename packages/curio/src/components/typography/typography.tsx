"use client";

import { createElement, MouseEvent, MouseEventHandler, ReactNode, Ref } from "react";

import { useIsTruncated, useToggle } from "../../hooks";
import { CssUtils } from "../../utils";

import { Tooltip } from "../tooltip";

export const TypographyColor = {
	DEFAULT: "default",
	ERROR: "error",
	INHERIT: "inherit",
	MUTED: "muted",
	PRIMARY: "primary",
	SECONDARY: "secondary",
	SUCCESS: "success",
	WARNING: "warning"
} as const;

export const TypographyVariant = {
	BODY1: "body1",
	BODY2: "body2",
	CAPTION: "caption",
	H1: "h1",
	H2: "h2",
	H3: "h3",
	H4: "h4",
	H5: "h5",
	H6: "h6",
	OVERLINE: "overline",
	SUBTITLE1: "subtitle1",
	SUBTITLE2: "subtitle2"
} as const;

export type TypographyVariantType = typeof TypographyVariant[keyof typeof TypographyVariant];

export type TypographyComponent =
	| "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
	| "p" | "span" | "div" | "label" | "dt" | "dd";

const ALIGN_STYLES = {
	center: "text-center",
	left: "text-left",
	right: "text-right"
} as const;

const COLOR_STYLES = {
	primary: "text-blue-600 dark:text-blue-400",
	secondary: "text-purple-600 dark:text-purple-400",
	default: "text-gray-900 dark:text-gray-100",
	inherit: "text-inherit",
	muted: "text-gray-600 dark:text-gray-400",
	error: "text-red-700 dark:text-red-400",
	warning: "text-amber-600 dark:text-amber-400",
	success: "text-emerald-600 dark:text-emerald-400"
} as const;

const VARIANT_MAPPING: Record<TypographyVariantType, TypographyComponent> = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	h5: "h5",
	h6: "h6",
	body1: "p",
	body2: "p",
	subtitle1: "h6",
	subtitle2: "h6",
	caption: "span",
	overline: "span"
} as const;

const VARIANT_STYLES: Record<TypographyVariantType, string> = {
	h1: "text-5xl font-bold leading-tight",
	h2: "text-4xl font-bold leading-tight",
	h3: "text-3xl font-semibold leading-snug",
	h4: "text-2xl font-semibold leading-snug",
	h5: "text-xl font-semibold leading-normal",
	h6: "text-lg font-semibold leading-normal",
	body1: "text-base leading-relaxed",
	body2: "text-sm leading-relaxed",
	subtitle1: "text-lg font-medium leading-normal",
	subtitle2: "text-base font-medium leading-normal",
	caption: "text-xs leading-normal",
	overline: "text-xs uppercase tracking-wide leading-normal"
} as const;

const WEIGHT_STYLES = {
	bold: "font-bold",
	medium: "font-medium",
	normal: "font-normal",
	semibold: "font-semibold"
} as const;

export interface TypographyProps {
	children: ReactNode;
	align?: "left" | "center" | "right";
	className?: string;
	color?: typeof TypographyColor[keyof typeof TypographyColor];
	component?: TypographyComponent;
	id?: string;
	onMouseEnter?: MouseEventHandler<HTMLElement>;
	onMouseLeave?: MouseEventHandler<HTMLElement>;
	ref?: Ref<HTMLElement>;
	truncate?: boolean;
	variant?: TypographyVariantType;
	weight?: "normal" | "medium" | "semibold" | "bold";
}

const Typography = ({
	children,
	align = "left",
	className,
	color = "default",
	component,
	id,
	onMouseEnter,
	onMouseLeave,
	ref,
	truncate = false,
	variant: variantProp = "body1",
	weight,
	...props
}: TypographyProps) => {
	const [isTruncated, targetRef] = useIsTruncated();
	const [isHovered, toggleIsHovered] = useToggle(false);

	const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
		toggleIsHovered(true);
		onMouseEnter?.(event);
	};

	const handleMouseLeave = (event: MouseEvent<HTMLDivElement>) => {
		toggleIsHovered(false);
		onMouseLeave?.(event);
	};

	const setRefs = (node: HTMLElement | null) => {
		targetRef(node);

		if(typeof ref === "function") {
			ref(node);
		} else if (ref) {
			(ref as any).current = node;
		}
	};

	const supportedVariant = VARIANT_MAPPING[variantProp] ? variantProp : "body1";

    const classes = CssUtils.mergeClasses(
		VARIANT_STYLES[supportedVariant],
		COLOR_STYLES[color],
		ALIGN_STYLES[align],
		truncate && "truncate block w-full",
		weight && WEIGHT_STYLES[weight],
		className
    );

	const element = createElement(
		component || VARIANT_MAPPING[supportedVariant],
		{
			ref: setRefs,
			className: classes,
			id,
			onMouseEnter: handleMouseEnter,
			onMouseLeave: handleMouseLeave,
			// If truncated, we add a native title as a fallback if no Tooltip is used
			title: (truncate && isTruncated && typeof children === "string")
				? (children as string)
				: undefined,
			...props
		},
		children
	);

	if(truncate) {
		return (
			<Tooltip
				content={isTruncated ? children : null}
				show={isHovered && isTruncated}>
				{element}
			</Tooltip>
		);
	}

    return element;
};

Typography.displayName = "Typography";

export default Typography;
