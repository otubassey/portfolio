import { ForwardedRef, FC, memo, forwardRef } from "react";
import { withDisplayName } from "../../decorator";
import SVGBase from "./SVGBase";
import { SVGIconProps } from "./icon.types";

function FastForward({description, svg, title, ...otherProps}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): FC<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "fastForwardDescription", value: "An FastForward Icon", ...description}}
            svg={{fill: "#000000", stroke: "none", ...(svg ?? {})}}
            title={{id: "fastForwardTitle", value: "FastForward", ...title}}
            {...otherProps}>
            <g>
                <rect fill="none" height="24" width="24"/>
                <rect fill="none" height="24" width="24"/>
                <rect fill="none" height="24" width="24"/>
            </g>
            <g><g/>
            <path d="M15,9.86L18.03,12L15,14.14V9.86 M6,9.86L9.03,12L6,14.14V9.86 M13,6v12l8.5-6L13,6L13,6z M4,6v12l8.5-6L4,6L4,6z"/>
            </g>
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName<SVGIconProps>()(FastForward)));
