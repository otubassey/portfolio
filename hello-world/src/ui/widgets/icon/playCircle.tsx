import { ForwardedRef, memo, forwardRef, ReactElement } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

PlayCircle.propTypes = {
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

function PlayCircle({
    description,
    svg,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): ReactElement<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "playCircleDescription", value: "A PlayCircle Icon", ...description}}
            svg={{fill: "#FFFFFF", stroke: "none", ...(svg ?? {})}}
            title={{id: "playCircleTitle", value: "PlayCircle", ...title}}
            {...otherProps}>
            <g>
                <rect fill="none" height="24" width="24"/>
            </g>
            <g>
                <path
                    d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M9.5,14.67V9.33c0-0.79,0.88-1.27,1.54-0.84 l4.15,2.67c0.61,0.39,0.61,1.29,0,1.68l-4.15,2.67C10.38,15.94,9.5,15.46,9.5,14.67z"
                />
            </g>
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName()(PlayCircle)));
