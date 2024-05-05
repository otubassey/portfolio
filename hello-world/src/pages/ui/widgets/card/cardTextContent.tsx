import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";

type CardTextContentProps = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
    text?: string | null;
};

function CardTextContent({
    children = null,
    className = null,
    component = null,
    text = null,
    ...otherProps
}: CardTextContentProps, ref: ForwardedRef<Element>) {
    const Component = component ?? "div";
    const classes = className ?? "";
    const content = text ?? children;
    return (
        <Component ref={ref} className={classes} {...otherProps}>
            {content}
        </Component>
    );
}

export default forwardRef<Element, CardTextContentProps>(CardTextContent);
