import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

type Props = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
    text?: string | null;
};

CardTextContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    text: PropTypes.string
}

function CardTextContent({
    children = null,
    className = null,
    component = null,
    text = null,
    ...otherProps
}: Props, ref: ForwardedRef<HTMLElement>) {
    const Component = component ?? "div";
    const classes = className ?? "";
    const content = text ?? children;
    return (
        <Component ref={ref} className={classes} {...otherProps}>
            {content}
        </Component>
    );
}

export default forwardRef<HTMLElement, Props>(withDisplayName()(CardTextContent));
