import { ForwardedRef, ReactElement, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils";

export const Elevations = {
    EXTRA_SMALL: "xs",
    SMALL: "sm",
    MEDIUM: "md",
    LARGE: "lg",
    EXTRA_LARGE: "xl",
    EXTRA_EXTRA_LARGE: "2xl",
    NONE: "none"
} as const;

const ShadowByElevation = {
    [Elevations.EXTRA_SMALL]: "shadow-sm",
    [Elevations.SMALL]: "shadow",
    [Elevations.MEDIUM]: "shadow-md",
    [Elevations.LARGE]: "shadow-lg",
    [Elevations.EXTRA_LARGE]: "shadow-xl",
    [Elevations.EXTRA_EXTRA_LARGE]: "shadow-2xl",
    [Elevations.NONE]: "shadow-none"
} as const;

export type Elevation = typeof Elevations[keyof typeof Elevations];

export const getRootClassName = (elevation: Elevation): string => {
    const elevationValue = elevation ?? Elevations.EXTRA_SMALL;
    const boxShadow = ShadowByElevation[elevationValue] ?? ShadowByElevation[Elevations.EXTRA_SMALL];
    return `bg-transparent rounded ${boxShadow} p-2`;
};

type Props = {
    children: ReactNode;
    className?: string | null;
    elevation?: Elevation;
};

Paper.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    elevation: PropTypes.oneOf(Object.values(Elevations))
};

function Paper({children, className = null, elevation, ...otherProps}: Props, ref: ForwardedRef<HTMLDivElement>): ReactElement<Props> {
    return (
        <div ref={ref} className={ClassesUtil.concat(getRootClassName(elevation), className)} {...otherProps}>
            {children}
        </div>
    );
}

export default forwardRef<HTMLDivElement, Props>(withDisplayName()(Paper));
