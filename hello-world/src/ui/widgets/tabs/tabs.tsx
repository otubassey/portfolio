import { ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";

import { withDisplayName } from "@/ui/decorator";
import { ClassesUtil } from "@/ui/utils/";

const CLASSNAMES = {
    root: "relative flex text-slate-400 text-xs leading-6 flex-auto pt-2 overflow-hidden"
} as const;

type TabsProps = {
    children: ReactNode,
    className?: string | null
};

Tabs.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
};

function Tabs({children = null, className = null}: TabsProps, ref: ForwardedRef<HTMLDivElement>) {
    return (
        <div
            ref={ref}
            className={ClassesUtil.concat(CLASSNAMES.root, className)}>
            {children}
        </div>
    );
}

export default forwardRef<HTMLDivElement, TabsProps>(withDisplayName<TabsProps>()(Tabs));
