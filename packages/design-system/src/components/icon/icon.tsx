"use client";

import { cloneElement, ElementType, isValidElement, Ref, SVGAttributes } from "react";

import { CssUtils } from "../../utils";

import { FALLBACK_ICON, IconName, ICONS_BY_NAME } from "./constants";

export const IconSize = {
    LARGE: "large",
    MEDIUM: "medium",
    SMALL: "small"
} as const;

const RemSizesBySize: {[key: string]: string} = {
    [IconSize.LARGE]: "2.4rem",
    [IconSize.MEDIUM]: "2.1rem",
    [IconSize.SMALL]: "1.8rem"
} as const;

function getRemSize(size: IconProps["size"]): IconProps["size"] {
    if(!size) {
        return RemSizesBySize[IconSize.SMALL];
    }
	if(typeof size === "number") {
		return `${size}px`;
	}
    const expectedSize = RemSizesBySize[size];
    if(!expectedSize && typeof size === "string") {
        return size;
    }
    return expectedSize;
}

export interface IconProps extends SVGAttributes<SVGElement> {
	className?: string;
	component?: ElementType;
	hideAriaLabel?: boolean;
	name?: IconName;
	ref?: Ref<SVGSVGElement>;
	size?: number | string | "small" | "medium" | "large";
}

const Icon = ({
	className,
	component: Component,
	hideAriaLabel = false,
	name,
	ref,
	size = "small",
	...props
}: IconProps) => {
	const remSize = getRemSize(size);

	const finalProps = {
		ref,
        "aria-hidden": hideAriaLabel ? undefined : true,
        className: CssUtils.mergeClasses("shrink-0", className),
        height: remSize,
        width: remSize,
        ...props
    };

	const Source = (Component || (name && ICONS_BY_NAME[name]) || FALLBACK_ICON);

	if(isValidElement(Source)) {
        return cloneElement(Source, finalProps as any);
    }

	const Renderable = Source as ElementType;
    return <Renderable {...finalProps} />;
}

Icon.displayName = "Icon";

export default Icon;
