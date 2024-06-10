import { ForwardedRef, ReactElement, forwardRef, memo } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

Cases.propTypes = {
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

function Cases({
    description,
    svg,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): ReactElement<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "casesDescription", value: "An Cases Icon", ...description}}
            svg={{fill: "#000000", ...(svg ?? {})}}
            title={{id: "casesTitle", value: "Cases", ...title}}
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
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName()(Cases)))
