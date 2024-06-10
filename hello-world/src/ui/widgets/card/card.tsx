import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import Paper from "@/ui/widgets/paper/paper";
import {ClassesUtil} from "@/ui/utils";

type Props = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
};

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType
};

function Card({
    children = null,
    className = null,
    component = null,
    ...otherProps
}: Props, ref: ForwardedRef<HTMLElement>) {
    const Component = component ?? Paper;
    return (
        <Component ref={ref} className={ClassesUtil.concat(className, "shadow-lg rounded-lg")} {...otherProps}>
            {children}
        </Component>
    );
}

export default forwardRef<HTMLElement, Props>(withDisplayName()(Card));
