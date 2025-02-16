import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

type Props = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
    show?: boolean;
    unmountOnExit?: boolean;
};

const Collapse = forwardRef<HTMLElement, Props>(({
    children = null,
    className = null,
    component: Component = "div",
    show = false,
    unmountOnExit = false
}: Props, ref: ForwardedRef<HTMLElement>) => {
    return (
        <Component ref={ref} className={ClassesUtils.concat({["hidden"]: !show}, className)}>
            {children}
        </Component>
    );
});

Collapse.displayName = getDisplayName(Collapse);

Collapse.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    show: PropTypes.bool,
    unmountOnExit: PropTypes.bool
};

export default Collapse;
