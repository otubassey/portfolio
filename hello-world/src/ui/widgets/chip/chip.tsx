import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import {ClassesUtil} from "@/ui/utils";

const CLASSNAMES = {
    root: "flex items-center rounded-full px-3 py-1 text-xs font-medium leading-5 w-fit shadow-md border border-slate-200" 
} as const;

type ChipProps = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
    label?: string | null;
};

Chip.protoTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    label: PropTypes.string
};

function Chip({
    children = null,
    className = null,
    component = null,
    label = null
}: ChipProps, ref: ForwardedRef<HTMLElement>) {
    const Component = component ?? "div";
    const content = label ?? children;
    return (
        <Component ref={ref} className={ClassesUtil.concat(CLASSNAMES.root, className)}>
            {content}
        </Component>
    );
}

export default forwardRef<HTMLElement, ChipProps>(withDisplayName()(Chip));
