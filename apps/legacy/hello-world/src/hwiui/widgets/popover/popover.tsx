import { ElementType, memo, ReactEventHandler, ReactNode, useMemo, useRef } from "react";

import Modal, { ModalAttributes } from "../modal/modal";

const ELEMENT_NODE_TYPE = 1;

type PopoverAttributes = {
    anchorElement: ElementType;
    children?: ReactNode;
    classes?: any;
    container?: ElementType;
    onClose?: ReactEventHandler;
    open: boolean;
    ModalProps?: ModalAttributes;
};

const Popover = ({
    anchorElement: anchorElementProp,
    children,
    classes,
    container,
    onClose,
    open,
    ModalProps
}: PopoverAttributes) => {
    const modalRef = useRef();
    const anchorElement = anchorElementProp?.nodeType === ELEMENT_NODE_TYPE
        ? anchorElementProp
        : modalRef.current?.ownerDocument?.body ?? document;
    const positionOffset = useMemo(() => {
        const anchorRect = anchorElement.getBoundingClientRect();
        // return {
        //     top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
        //     left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal),
        // };
    }, [anchorElement]);
    return (
        <Modal ref={modalRef} open={open} {...ModalProps}>
            {children}
        </Modal>
    );
};

export default memo(Popover);
