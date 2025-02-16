import { ForwardedRef, forwardRef, ReactElement } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

const ArrowForwardIOSIcon = forwardRef<SVGElement, SVGIconProps>(({
    description,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGElement>): ReactElement<SVGIconProps> => {
    return (
        <SVGBase
            ref={ref}
            description={description || "ArrowForwardIOS Icon"}
            title={title || "arrowForwardIOS"}
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
});

ArrowForwardIOSIcon.displayName = getDisplayName(ArrowForwardIOSIcon);

ArrowForwardIOSIcon.propTypes = {
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

export default ArrowForwardIOSIcon;
