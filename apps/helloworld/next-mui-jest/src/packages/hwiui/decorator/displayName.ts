import {
    ComponentPropsWithoutRef,
    ComponentType,
    CustomComponentPropsWithRef,
    ExoticComponent,
    FunctionComponent,
    FunctionComponentElement,
    NamedExoticComponent
} from "react";
import { getDisplayName as Next_JS_getDisplayName} from "next/dist/shared/lib/utils";

const UNNAMED_COMPONENT = "UnnamedComponent";

export function setDisplayName<T extends ComponentType<any>>(
    TargetComponent: T,
    prefix: string | null,
    ...names: Array<string | null>
) {
    if(!TargetComponent) {
        return TargetComponent;
    }
    const formattedName = names.filter(Boolean).join("-");
    return Object.defineProperty(TargetComponent, "displayName", {
        value: prefix ? `${prefix}-${formattedName}` : formattedName
    });
}

export function getDisplayName<T extends ComponentType<any>>(SourceComponent: T, defaultValue?: string): string {
    if(!SourceComponent) {
        return defaultValue ?? UNNAMED_COMPONENT;
    }
    if(typeof SourceComponent === "string" || typeof SourceComponent === "number") {
        return String(SourceComponent);
    }
    const displayName = Next_JS_getDisplayName(SourceComponent as ComponentType<any>);
    // getDisplayName from Next.js returns 'Unknown' in an indeterministic scenario
    const isUnknown = Boolean(displayName) && displayName === "Unknown";
    if(!isUnknown) {
        return displayName;
    }
    if(typeof SourceComponent === "object") {
        if((SourceComponent as FunctionComponent).displayName) {
            return (SourceComponent as FunctionComponent).displayName ?? defaultValue ?? UNNAMED_COMPONENT;
        }
        
        if((SourceComponent as ExoticComponent).$$typeof) {
            if((SourceComponent as FunctionComponentElement<T>).type) {
                return getDisplayName((SourceComponent as FunctionComponentElement<T>).type);
            }

            if((SourceComponent as NamedExoticComponent<T>).render) {
                return getDisplayName((SourceComponent as NamedExoticComponent<T>).render);
            }
        }
    }
    return UNNAMED_COMPONENT;
}

function displayName<T extends ComponentType<any>>(prefix: string | null = null) {
    return (WrappedComponent: T): T | ExoticComponent<T> | CustomComponentPropsWithRef<T> | ComponentPropsWithoutRef<T> => {
        if(!WrappedComponent) {
            return WrappedComponent;
        }
        return setDisplayName<T>(
            WrappedComponent,
            prefix,
            getDisplayName<T>(WrappedComponent)
        );
    };
}

export default displayName;
