import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";

type Props = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
    text?: string | null;
};

const CardTextContent = forwardRef<HTMLElement, Props>(({
    children = null,
    className = null,
    component = null,
    text = null,
    ...otherProps
}: Props, ref: ForwardedRef<HTMLElement>) => {
    const Component = component ?? "div";
    const classes = className ?? "";
    const content = text ?? children;
    return (
        <Component ref={ref} className={classes} {...otherProps}>
            {content}
        </Component>
    );
});

CardTextContent.displayName = getDisplayName(CardTextContent);

CardTextContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    text: PropTypes.string
}

export default CardTextContent;
