import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

type Props = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
};

CardFooter.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType
}

function CardFooter({
    children = null,
    className = null,
    component = null,
    ...otherProps
}: Props, ref: ForwardedRef<HTMLElement>) {
    const Component = component ?? "div";
    return (
        <Component ref={ref} className={className} {...otherProps}>
            {children}
        </Component>
    );
}

export default forwardRef<HTMLElement, Props>(withDisplayName()(CardFooter));
