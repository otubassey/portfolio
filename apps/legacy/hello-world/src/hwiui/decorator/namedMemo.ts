import { ComponentType, MemoExoticComponent, PropsWithChildren, memo } from "react";
import { getDisplayName } from "./displayName";

/**
 * Supplements React's memo decorator to expose the component's displayName.
 * @returns a decorator
 */
function namedMemo<T extends ComponentType<any>>(
    WrappedComponent: T,
    propsAreEqual?: (
        prevProps: Readonly<PropsWithChildren<T>>,
        nextProps: Readonly<PropsWithChildren<T>>
    ) => boolean
): T | MemoExoticComponent<T> {
    if(!WrappedComponent) {
        return WrappedComponent;
    }
    const MemoizedWrappedComponent = memo(WrappedComponent, propsAreEqual);

    return Object.defineProperty(MemoizedWrappedComponent, "displayName", {
        value: WrappedComponent.displayName ?? getDisplayName(WrappedComponent)
    });
}

export default namedMemo;
