import { ElementType, ForwardedRef, KeyboardEventHandler, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";

export type Props = {
    children: ReactNode;
    component?: ElementType | null;
    className?: string | null;
    value?: unknown;
    onClick?: KeyboardEventHandler<HTMLInputElement> | null;
};

ListItemButton.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    onClick: PropTypes.func
};

function ListItemButton({
    children = null,
    className = null,
    component = null,
    onClick = null,
    ...otherProps
}: Props, ref: ForwardedRef<Element>) {
    const Component = component ?? "li";
    return (
        <Component ref={ref} className={className} onClick={onClick} {...otherProps}>
            {children}
        </Component>
    );
}

export default forwardRef<Element, Props>(withDisplayName()(ListItemButton));
