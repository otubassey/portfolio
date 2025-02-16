import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import Paper from "@/hwiui/widgets/paper/paper";
import {ClassesUtils} from "@/hwiutils";

type Props = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType;
    raised?: boolean;
};

// next components: card, tab, carousel, transistion
const Card = forwardRef<HTMLDivElement, Props>(({
    children = null,
    className = null,
    component,
    raised,
    ...otherProps
}: Props, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <Paper
            ref={ref}
            component={component}
            className={ClassesUtils.concat(className, "rounded-lg")}
            elevation={raised ? "md" : "sm"}
            {...otherProps}>
            {children}
        </Paper>
    );
});

Card.displayName = getDisplayName(Card);

Card.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    raised: PropTypes.bool
};

export default Card;
