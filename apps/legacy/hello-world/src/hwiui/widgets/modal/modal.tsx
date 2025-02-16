import { cloneElement, ElementType, ForwardedRef, forwardRef, isValidElement, memo, ReactEventHandler, ReactNode, useCallback, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Paper, PaperAttributes } from "../paper";

export type ModalAttributes = {
    children?: ReactNode;
    disablePortal?: boolean;
    open?: boolean;
    component?: ElementType;
    container?: ElementType;
    onClose?: ReactEventHandler;
    PaperProps?: PaperAttributes;
};

// Create a Popover component
const Modal = forwardRef(({
    children,
    disablePortal,
    open,
    component,
    container,
    onClose,
    PaperProps
}: ModalAttributes, ref: ForwardedRef<HTMLElement & HTMLDivElement>) => {
    const [containerNode, setContainerNode] = useState<HTMLElement | ElementType | null>(null);
    const handleBackDropClick = useCallback((event) => {
        onClose?.();
    }, [onClose]);
    console.log("tagged-Modal: vals =", {
        containerNode,
        disablePortal,
        open,
        container,
        children,
        childrenToJS: children?.toJS?.(),
    });
    useLayoutEffect(() => {
        if(!disablePortal) {
            setContainerNode(container || document.body);
        }
      }, [container, disablePortal]);
    if(!open) {
        return null;
    }
    if(disablePortal) {
        if(isValidElement(children)) {
            // TODO: will this work for array/list?
            // forward child ref below
            return cloneElement(children, {});
        }
        return children;
    }
    if(!containerNode) {
        return containerNode;
    }
    return createPortal(
        (
            <div ref={ref} role="presentation" className="border border-purple-700 fixed h-full w-full inset-0" onClick={handleBackDropClick}>
                <Paper
                    component={component}
                    className="absolute top-1/4 left-1/4 right-1/4"
                    {...PaperProps}>
                    {children}
                </Paper>
            </div>
        ),
        containerNode!
    );
});

export default memo(Modal);
