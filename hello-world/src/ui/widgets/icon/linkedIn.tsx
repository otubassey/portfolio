import { ForwardedRef, memo, forwardRef, FC } from "react";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

function LinkedIn({description, svg, title, ...otherProps}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): FC<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "linkedInDescription", value: "A LinkedIn Icon", ...description}}
            svg={{fill: "currentColor", stroke: "none", strokeLinecap: "round", strokeLinejoin: "round", ...(svg ?? {})}}
            title={{id: "linkedInTitle", value: "LinkedIn", ...title}}
            {...otherProps}>
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2" />
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName<SVGIconProps>()(LinkedIn)));
