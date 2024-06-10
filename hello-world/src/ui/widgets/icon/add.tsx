import { ForwardedRef, forwardRef, memo, ReactElement } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

Add.propTypes = {
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

function Add({
    description,
    svg,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): ReactElement<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "addDescription", value: "An Add Icon", ...description}}
            svg={{stroke: "none", ...(svg ?? {})}}
            title={{id: "addTitle", value: "Add", ...title}}
            {...otherProps}>
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName()(Add)));
