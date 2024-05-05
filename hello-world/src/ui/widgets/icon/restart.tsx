import { ForwardedRef, memo, forwardRef, ReactElement } from "react";
import { withDisplayName } from "../../decorator";
import SVGBase from "./SVGBase";
import { SVGIconProps } from "./icon.types";

function Restart({description, svg, title, ...otherProps}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): ReactElement<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "restartDescription", value: "A Restart Icon", ...description}}
            svg={{stroke: "none", ...(svg ?? {})}}
            title={{id: "restartTitle", value: "Restart", ...title}}
            {...otherProps}>
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"
            />
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName<SVGIconProps>()(Restart)));
