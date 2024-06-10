import { ForwardedRef, ReactElement, forwardRef, memo } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

Close.propTypes = {
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

function Close({
    description,
    svg,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): ReactElement<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "closeDescription", value: "A Close Icon", ...description}}
            svg={{fill: "#000000", ...(svg ?? {})}}
            title={{id: "closeTitle", value: "Close", ...title}}
            {...otherProps}>
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName()(Close)));
