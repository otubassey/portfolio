import { ForwardedRef, forwardRef, ReactElement } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

const FastForwardIcon = forwardRef<SVGElement, SVGIconProps>(({
    description,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGElement>): ReactElement<SVGIconProps> => {
    return (
        <SVGBase
            ref={ref}
            description={description || "FastForward Icon"}
            title={title || "FastForward"}
            {...otherProps}>
                <path
                    d="M5.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L5.58 7.11C4.91 6.65 4 7.12 4 7.93v8.14c0 .81.91 1.28 1.58.82zM13 7.93v8.14c0 .81.91 1.28 1.58.82l5.77-4.07c.56-.4.56-1.24 0-1.63l-5.77-4.07c-.67-.47-1.58 0-1.58.81z"
                />
        </SVGBase>
    );
});

FastForwardIcon.displayName = getDisplayName(FastForwardIcon);

FastForwardIcon.propTypes = {
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

export default FastForwardIcon;
