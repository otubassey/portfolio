import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import {ClassesUtils} from "@/hwiutils";

const CLASSNAMES = {
    root: "flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 w-fit shadow-md border border-slate-200" 
} as const;

type ChipProps = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
    label?: string | null;
};

const Chip = forwardRef<HTMLElement, ChipProps>(({
    children = null,
    className = null,
    component = null,
    label = null
}: ChipProps, ref: ForwardedRef<HTMLElement>) => {
    const Component = component ?? "div";
    const content = label ?? children;
    return (
        <Component ref={ref} className={ClassesUtils.concat(CLASSNAMES.root, className)}>
            {content}
        </Component>
    );
});

Chip.displayName = getDisplayName(Chip);

Chip.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    label: PropTypes.string
};

export default Chip;
