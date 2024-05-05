import { FC, ForwardedRef, forwardRef, memo } from "react";

import { withDisplayName } from "@/pages/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

function OpenInNewIcon({description, svg, title, ...otherProps}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): FC<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "openInNewDescription", value: "A Open-In-New Icon", ...description}}
            svg={{stroke: "none", ...(svg ?? {})}}
            title={{id: "openInNewTitle", value: "Open In New", ...title}}
            {...otherProps}>
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName<SVGIconProps>()(OpenInNewIcon)));
