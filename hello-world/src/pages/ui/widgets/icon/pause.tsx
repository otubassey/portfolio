import { ForwardedRef, FC, memo, forwardRef } from "react";
import { withDisplayName } from "../../decorator";
import SVGBase from "./SVGBase";
import { SVGIconProps } from "./icon.types";

function Pause({description, svg, title, ...otherProps}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): FC<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "pauseDescription", value: "A Pause Icon", ...description}}
            svg={{stroke: "none", ...(svg ?? {})}}
            title={{id: "pauseTitle", value: "pause", ...title}}
            {...otherProps}>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m7-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName<SVGIconProps>()(Pause)));
