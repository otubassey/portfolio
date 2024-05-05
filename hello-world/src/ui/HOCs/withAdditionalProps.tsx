import { ComponentType } from "react";

import { getDisplayName } from "@/ui/decorator";

export interface WithAdditionalComponentProps {
    [key: string]: any
};

function withAdditionalProps<T extends WithAdditionalComponentProps = WithAdditionalComponentProps>(otherProps: T) {
    return (WrappedComponent: ComponentType<T>) => {
        if(!WrappedComponent) {
            return null;
        }
        const displayName = WrappedComponent.displayName || getDisplayName(WrappedComponent);
        const Wrapper = (currentProps: Omit<T, keyof WithAdditionalComponentProps>) => (
            <WrappedComponent {...currentProps as T} {...otherProps as T} />
        );
        Wrapper.displayName = `withAdditionalProps(${displayName})`;
        return Wrapper;
    };
}

export default withAdditionalProps;
