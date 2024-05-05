import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";

export type ListProps = {
    children: ReactNode,
    className?: string | null
    component?: ElementType | null
};

function List({
    children = null,
    className = null,
    component = null,
    ...otherProps
}: ListProps, ref: ForwardedRef<Element>) {
    const Component = component ?? "ul";
    return (
        <Component ref={ref} className={className} {...otherProps}>
            {children}
        </Component>
    );
}

export default forwardRef<Element, ListProps>(List);
