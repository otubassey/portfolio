import { ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { useGeneratedId } from "@/hwiui/hooks";

import { SVGIconProps } from "./icon.types";

const DEFAULT_PROP_VALUES = {
    height: "2rem",
    role: "graphics-symbol",
    width: "2rem"
} as const;

type Props = SVGIconProps & {
    children: ReactNode;
};

const SVGBase = forwardRef<SVGElement, Props>(({
    children = null,
    description,
    height,
    role,
    title,
    width,
    ...props
}: Props, ref: ForwardedRef<SVGElement>) => {
    const componentId = useGeneratedId();
    const {fill, ...otherProps} = {...(props ?? {})};
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby={componentId || "svgTitle"}
            fill={fill ?? "currentColor"}
            height={height || DEFAULT_PROP_VALUES.height}
            role={role || DEFAULT_PROP_VALUES.role}
            viewBox="0 0 24 24"
            width={width || DEFAULT_PROP_VALUES.width}
            {...otherProps}>
            <title id={componentId ?? "unnamedSvgTitle"}>{title || "Unnamed SVG"}</title>
            <desc>{description || "An Unnamed SVG"}</desc>
            {children}
        </svg>
    );
});

SVGBase.displayName = getDisplayName(SVGBase);

SVGBase.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    description: PropTypes.string,
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    role: PropTypes.string,
    title: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
};

export default SVGBase;
