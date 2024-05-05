import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

type CardFooterProps = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
};

CardFooter.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType
}

function CardFooter({
    children = null,
    className = null,
    component = null,
    ...otherProps
}: CardFooterProps, ref: ForwardedRef<Element>) {
    const Component = component ?? "div";
    return (
        <Component ref={ref} className={className} {...otherProps}>
            {children}
        </Component>
    );
}

export default forwardRef<Element, CardFooterProps>(CardFooter);
