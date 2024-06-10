import { ForwardedRef, memo, forwardRef, ReactElement } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

ArrowForwardIOS.propTypes = {
    description: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string
    }),
    svg: PropTypes.shape({
        className: PropTypes.string,
        fill: PropTypes.string
    }),
    title: PropTypes.shape({
        id: PropTypes.string,
        value: PropTypes.string
    })
};

function ArrowForwardIOS({
    description,
    svg,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): ReactElement<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "arrowForwardIOSDescription", value: "An ArrowForwardIOS Icon", ...description}}
            svg={{fill: "#ffffff", stroke: "none", ...(svg ?? {})}}
            title={{id: "arrowForwardIOSTitle", value: "arrowForwardIOS", ...title}}
            {...otherProps}>
            <path
                d="M24 24H0V0h24v24z"
                fill="none"
                opacity=".87"
            />
            <path
                d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z"
            />
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName()(ArrowForwardIOS)));
