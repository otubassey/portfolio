import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

type Props = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
};

const CardFooter = forwardRef<HTMLElement, Props>(({
    children = null,
    className = null,
    component = null,
    ...otherProps
}: Props, ref: ForwardedRef<HTMLElement>) => {
    const Component = component ?? "div";
    return (
        <Component ref={ref} className={className} {...otherProps}>
            {children}
        </Component>
    );
});

CardFooter.displayName = getDisplayName(CardFooter);

CardFooter.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType
}

export default CardFooter;
