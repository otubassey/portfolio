import { ForwardedRef, memo, forwardRef, ReactElement } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

PauseCircle.propTypes = {
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

function PauseCircle({
    description,
    svg,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): ReactElement<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "pauseCircleDescription", value: "A Pause Circle Icon", ...description}}
            svg={{fill: "#FFFFFF", stroke: "none", ...(svg ?? {})}}
            title={{id: "pauseCircleTitle", value: "pauseCircle", ...title}}
            {...otherProps}>
            <g>
                <rect fill="none" height="24" width="24"/>
            </g>
            <g>
                <g>
                    <path
                        d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M10,16L10,16c-0.55,0-1-0.45-1-1V9 c0-0.55,0.45-1,1-1l0,0c0.55,0,1,0.45,1,1v6C11,15.55,10.55,16,10,16z M14,16L14,16c-0.55,0-1-0.45-1-1V9c0-0.55,0.45-1,1-1l0,0 c0.55,0,1,0.45,1,1v6C15,15.55,14.55,16,14,16z"
                    />
                </g>
            </g>
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName()(PauseCircle)));
