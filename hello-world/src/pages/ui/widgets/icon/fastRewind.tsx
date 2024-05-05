import { ForwardedRef, FC, memo, forwardRef } from "react";
import { withDisplayName } from "../../decorator";
import SVGBase from "./SVGBase";
import { SVGIconProps } from "./icon.types";

function FastRewind({description, svg, title, ...otherProps}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): FC<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "fastRewindDescription", value: "An FastRewind Icon", ...description}}
            svg={{fill: "#000000", stroke: "none", ...(svg ?? {})}}
            title={{id: "fastRewindTitle", value: "FastRewind", ...title}}
            {...otherProps}>
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M18 9.86v4.28L14.97 12 18 9.86m-9 0v4.28L5.97 12 9 9.86M20 6l-8.5 6 8.5 6V6zm-9 0l-8.5 6 8.5 6V6z"/>
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName<SVGIconProps>()(FastRewind)));
