import { ForwardedRef, FC, memo, forwardRef } from "react";
import { withDisplayName } from "../../decorator";
import SVGBase from "./SVGBase";
import { SVGIconProps } from "./icon.types";

function Play({description, svg, title, ...otherProps}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): FC<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "playDescription", value: "A Play Icon", ...description}}
            svg={{stroke: "none", ...(svg ?? {})}}
            title={{id: "playTitle", value: "Play", ...title}}
            {...otherProps}>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 18V6l8 6-8 6Z"/>
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName<SVGIconProps>()(Play)));
