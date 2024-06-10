import { ForwardedRef, memo, forwardRef, ReactElement } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

import { SVGIconProps } from "./icon.types";
import SVGBase from "./SVGBase";

FastRewind.propTypes = {
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

function FastRewind({
    description,
    svg,
    title,
    ...otherProps
}: SVGIconProps, ref: ForwardedRef<SVGSVGElement>): ReactElement<SVGIconProps> {
    return (
        <SVGBase
            ref={ref}
            description={{id: "fastRewindDescription", value: "An FastRewind Icon", ...description}}
            svg={{fill: "#ffffff", stroke: "none", ...(svg ?? {})}}
            title={{id: "fastRewindTitle", value: "FastRewind", ...title}}
            {...otherProps}> 
            <path
                d="M11 16.07V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.56.4-.56 1.24 0 1.63l5.77 4.07c.67.47 1.58 0 1.58-.81zm1.66-3.25l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"
            />
        </SVGBase>
    );
}

export default memo(forwardRef<SVGSVGElement, SVGIconProps>(withDisplayName()(FastRewind)));
