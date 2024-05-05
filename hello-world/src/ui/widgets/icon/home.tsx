import { FC, ForwardedRef, forwardRef, memo } from "react";

import { withDisplayName } from "@/ui/decorator";

import SVGBase from "./SVGBase";
import { SVGIconProps } from "./icon.types";

function Home({description, svg, title, ...otherProps}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): FC<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "homeDescription", value: "A Home Icon", ...description}}
            svg={{fill: "#000000", ...(svg ?? {})}}
            title={{id: "homeTitle", value: "Home", ...title}}
            {...otherProps}>
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName<SVGIconProps>()(Home)))
