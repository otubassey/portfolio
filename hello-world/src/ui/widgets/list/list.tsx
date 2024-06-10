import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

export type Props = {
    children: ReactNode;
    className?: string | null;
    component?: ElementType | null;
};

List.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType
};

function List({
    children = null,
    className = null,
    component = null,
    ...otherProps
}: Props, ref: ForwardedRef<Element>) {
    const Component = component ?? "ul";
    return (
        <Component ref={ref} className={className} {...otherProps}>
            {children}
        </Component>
    );
}

export default forwardRef<Element, Props>(withDisplayName()(List));
