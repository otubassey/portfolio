import { ForwardedRef, ReactElement, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

const CasesIcon = forwardRef<SVGElement, SVGIconProps>(({
    description,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGElement>): ReactElement<SVGIconProps> => {
    return (
        <SVGBase
            ref={ref}
            description={description || "Cases Icon"}
            title={title || "Cases"}
            {...otherProps}>
            <g>
                <rect fill="none" height="24" width="24"/>
            </g>
            <g>
                <g>
                    <path d="M3,9H1v11c0,1.11,0.89,2,2,2h17v-2H3V9z"/>
                    <path d="M18,5V3c0-1.1-0.9-2-2-2h-4c-1.1,0-2,0.9-2,2v2H5v11c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5H18z M12,3h4v2h-4V3z M21,16H7 V7h14V16z"/>
                </g>
            </g>
        </SVGBase>
    );
});

CasesIcon.displayName = getDisplayName(CasesIcon);

CasesIcon.propTypes = {
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

export default CasesIcon;
