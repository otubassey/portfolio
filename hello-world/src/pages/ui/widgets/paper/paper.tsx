import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { ClassesUtil } from "@/pages/ui/utils";

type PaperProps = {
    children: ReactNode;
    className?: string | null;
    component?: ElementType | null;
};

Paper.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType
};

function Paper({children, className = null, component = null, ...otherProps}: PaperProps, ref: ForwardedRef<HTMLElement>) {
    const Component = component ?? "div";
    return (
        <Component ref={ref} className={ClassesUtil.concat("bg-transparent rounded shadow-md p-2", className)} {...otherProps}>
            {children}
        </Component>
    );
}

export default forwardRef<HTMLElement, PaperProps>(Paper);
