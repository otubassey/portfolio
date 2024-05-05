import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";

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

function Chip({children = null, className = null, component = null, label = null}: ChipProps, ref: ForwardedRef<HTMLElement>) {
    const Component = component ?? "div";
    const content = label ?? children;
    return (
        <Component ref={ref} className={ClassesUtil.concat(CLASSNAMES.root, className)}>
            {content}
        </Component>
    );
}

export default forwardRef<HTMLElement, ChipProps>(Chip);
