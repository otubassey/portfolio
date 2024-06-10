import { ForwardedRef, forwardRef, memo, ReactElement } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

WorkHistory.propTypes = {
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

function WorkHistory({
    description,
    svg,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): ReactElement<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "workHistoryDescription", value: "A Work History Icon", ...description}}
            svg={{fill: "#000000", ...(svg ?? {})}}
            title={{id: "workHistoryTitle", value: "Work History", ...title}}
            {...otherProps}>
            <g><rect fill="none" height="24" width="24"/></g>
            <g>
                <g>
                    <path d="M4,19V8h16v3.29c0.72,0.22,1.4,0.54,2,0.97V8c0-1.11-0.89-2-2-2h-4V4c0-1.11-0.89-2-2-2h-4C8.89,2,8,2.89,8,4v2H4 C2.89,6,2.01,6.89,2.01,8L2,19c0,1.11,0.89,2,2,2h7.68c-0.3-0.62-0.5-1.29-0.6-2H4z M10,4h4v2h-4V4z"/>
                    <path d="M18,13c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S20.76,13,18,13z M19.65,20.35l-2.15-2.15V15h1v2.79l1.85,1.85 L19.65,20.35z"/>
                </g>
            </g>
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName()(WorkHistory)))
