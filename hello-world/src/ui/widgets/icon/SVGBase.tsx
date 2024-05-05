import { ForwardedRef, ReactNode, SVGAttributes, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import { defaultIfFalsy } from "./util";
import { DEFAULT_ICON_PROP } from "./icon.constants";
import { ClassesUtil } from "../../utils";

const {svg: defaultSVG} = DEFAULT_ICON_PROP;

type SVGBaseIconProps = SVGIconProps & {
    children: ReactNode
};

SVGBase.PropTypes = {
    children: PropTypes.node,
    description: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string
    }),
    svg: PropTypes.shape({
        className: PropTypes.string,
        fill: PropTypes.string
    })
};

function SVGBase({children = null, description, svg, title, ...otherProps}: SVGBaseIconProps, ref: ForwardedRef<SVGSVGElement>) {
    const {className: defaultClassName, ...otherDefaultSVGProps}: SVGAttributes<SVGSVGElement> = defaultSVG!;
    const {className: classNameProp, ...otherSVGProps} = {...defaultSVG, ...(svg ?? {})};
    return (
        <svg
            ref={ref}
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            aria-labelledby={`${title?.id ?? "svgTitle"} ${description?.id ?? "svgDescription"}`}
            className={ClassesUtil.concat(defaultClassName, classNameProp)}
            role="img"
            stroke="none"
            viewBox="0 0 24 24"
            {...otherDefaultSVGProps}
            {...otherSVGProps}
            {...otherProps}>
            <title id={defaultIfFalsy(title?.id, "svgTitle")}>{defaultIfFalsy(title?.value, "Unnamed SVG")}</title>
            <desc id={defaultIfFalsy(description?.id, "svgDescription")}>{defaultIfFalsy(description?.value, "An Unnamed SVG")}</desc>
            {children}
        </svg>
    );
}

export default forwardRef<SVGSVGElement, SVGBaseIconProps>(withDisplayName<SVGBaseIconProps>()(SVGBase));
