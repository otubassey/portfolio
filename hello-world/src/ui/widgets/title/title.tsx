import { ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "../../decorator";
import { ClassesUtil } from "../../utils";

const Variants = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
} as const;

const SizesByVariant = {
    [Variants.h1]: "text-7xl",
    [Variants.h2]: "text-5xl",
    [Variants.h3]: "text-3xl",
    [Variants.h4]: "text-xl",
    [Variants.h5]: "text-lg",
    [Variants.h6]: "text-base"
} as const;

export type Variant = typeof Variants[keyof typeof Variants];

type Props = {
    children?: ReactNode,
    className?: string | null,
    variant?: Variant
};

Title.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    variant: PropTypes.oneOf(Object.values(Variants))
};

function Title({
    children = null,
    className = null,
    variant = "h4",
    ...otherProps
}: Props, ref: ForwardedRef<HTMLHeadingElement>) {
    const Component = variant ?? "h4";
    const textSize = SizesByVariant[Component];
    return (
        <Component
            ref={ref}
            className={ClassesUtil.concat(textSize, className)}
            {...otherProps}>
            {children}
        </Component>
    );
}

export default forwardRef<HTMLHeadingElement, Props>(withDisplayName<Props>()(Title));
