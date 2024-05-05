import { FC, ForwardedRef, forwardRef, memo } from "react";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

function History({description, svg, title, ...otherProps}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): FC<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "historyDescription", value: "A History Icon", ...description}}
            svg={{fill: "#000000", ...(svg ?? {})}}
            title={{id: "historyTitle", value: "History", ...title}}
            {...otherProps}>
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8z"/>
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName<SVGIconProps>()(History)))
