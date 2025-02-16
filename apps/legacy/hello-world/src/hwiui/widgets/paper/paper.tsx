import { ElementType, ForwardedRef, ReactElement, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

export const PaperElevation = {
    EXTRA_SMALL: "xs",
    SMALL: "sm",
    MEDIUM: "md",
    LARGE: "lg",
    EXTRA_LARGE: "xl",
    EXTRA_EXTRA_LARGE: "2xl",
    NONE: "none"
} as const;

const ShadowByElevation = {
    [PaperElevation.EXTRA_SMALL]: "shadow-sm",
    [PaperElevation.SMALL]: "shadow",
    [PaperElevation.MEDIUM]: "shadow-md",
    [PaperElevation.LARGE]: "shadow-lg",
    [PaperElevation.EXTRA_LARGE]: "shadow-xl",
    [PaperElevation.EXTRA_EXTRA_LARGE]: "shadow-2xl",
    [PaperElevation.NONE]: "shadow-none"
} as const;

type PaperElevationAttributes = typeof PaperElevation[keyof typeof PaperElevation];

export type PaperAttributes = {
    children?: ReactNode;
    className?: string;
    component?: ElementType;
    elevation?: PaperElevationAttributes;
};

const Paper = forwardRef<HTMLDivElement, PaperAttributes>(({
    children,
    className,
    component,
    elevation,
    ...otherProps
}: PaperAttributes, ref: ForwardedRef<HTMLDivElement>): ReactElement<PaperAttributes> => {
    const Component = component ?? "div";
    const elevationValue = elevation ?? PaperElevation.EXTRA_SMALL;
    const boxShadow = ShadowByElevation[elevationValue] ?? ShadowByElevation[PaperElevation.EXTRA_SMALL];
    return (
        <Component
            ref={ref}
            className={ClassesUtils.merge(
                className,
                "bg-paper text-typography rounded p-4",
                boxShadow
            )}
            {...otherProps}>
            {children}
        </Component>
    );
});

Paper.displayName = getDisplayName(Paper);

Paper.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    elevation: PropTypes.oneOf(Object.values(PaperElevation))
};

export default Paper;
