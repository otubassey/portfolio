import { ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

import ListItemBase, {ListItemBaseProps} from "./listItemBase";

type Props = ListItemBaseProps & {
    secondaryAction?: ReactNode;
};

const ListItem = forwardRef<HTMLLIElement, Props>(({
    children,
    className,
    secondaryAction,
    ...listItemProps
}: Props, ref: ForwardedRef<HTMLLIElement>) => {
    return (
        <ListItemBase
            ref={ref}
            className={ClassesUtils.merge(
                className,
                [Boolean(secondaryAction) && "inline-flex items-center justify-between w-full"]
            )}
            {...listItemProps}>
            {children}
            {secondaryAction}
        </ListItemBase>
    );
});

ListItem.displayName = getDisplayName(ListItem);

ListItem.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    disableGutters: PropTypes.bool,
    disablePadding: PropTypes.bool,
    divider: PropTypes.bool,
    secondaryAction: PropTypes.node
};

export default ListItem;
