import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import {ClassesUtil} from "@/ui/utils";

import Paper from "@/ui/widgets/paper/paper";

type CardProps = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
};

Card.PropTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType
};

function Card({
    children = null,
    className = null,
    component = null,
    ...otherProps
}: CardProps, ref: ForwardedRef<Element>) {
    const Component = component ?? Paper;
    return (
        <Component ref={ref} className={ClassesUtil.defaultIfFalsy(className, null)} {...otherProps}>
            {children}
        </Component>
    );
}

export default forwardRef<Element, CardProps>(Card);
