import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

function mapPadding(
    disableGutters?: boolean,
    disablePadding?: boolean,
    indent?: boolean
): string {
    if(disablePadding) {
        return "p-0";
    }
    if(disableGutters) {
        return "px-0";
    }
    return indent ? "pl-6 pr-2 py-2" : "p-2";
}

export type ListItemBaseProps = {
    children?: ReactNode;
    className?: string;
    component?: ElementType | null;
    disableGutters?: boolean;
    disablePadding?: boolean;
    divider?: boolean;
    indent?: boolean;
};

const ListItemBase = forwardRef<HTMLLIElement, ListItemBaseProps>(({
    children,
    className,
    component,
    disableGutters = false,
    disablePadding = false,
    divider = false,
    indent = false,
    ...otherListItemProps
}: ListItemBaseProps, ref: ForwardedRef<HTMLLIElement>) => {
    const Component = component ?? "li";
    return (
        <Component ref={ref} className={ClassesUtils.merge(
            className,
            mapPadding(disableGutters, disablePadding, indent),
            [
                divider && "border-b border-b-slate-100"
            ]
            )}
            {...otherListItemProps}>
            {children}
        </Component>
    );
});

ListItemBase.displayName = getDisplayName(ListItemBase);

ListItemBase.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    disableGutters: PropTypes.bool,
    disablePadding: PropTypes.bool,
    divider: PropTypes.bool,
    indent: PropTypes.bool
};

export default ListItemBase;
