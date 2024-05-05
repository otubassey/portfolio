import { getDisplayName as Next_JS_getDisplayName} from "next/dist/shared/lib/utils";
import { ComponentType, ExoticComponent, FC, FunctionComponent, FunctionComponentElement, NamedExoticComponent } from "react";

const UNNAMED_COMPONENT = "UnnamedComponent";

export function setDisplayName<T>(
    TargetComponent: ComponentType<T>,
    prefix: string | null,
    ...names: Array<string | null>
) {
    if(!TargetComponent) {
        return TargetComponent;
    }
    const formattedName = names.filter(Boolean).join("-");
    TargetComponent.displayName = prefix ? `${prefix}-${formattedName}` : formattedName;
    return TargetComponent;
}

export function getDisplayName<T>(SourceComponent: ComponentType<T>): string | null {
    if(!SourceComponent || typeof SourceComponent === "string" || typeof SourceComponent === "number") {
        return SourceComponent;
    }
    const displayName = Next_JS_getDisplayName(SourceComponent);
    // getDisplayName from Next.js returns 'Unknown' in an indeterministic scenario
    const isUnknown = Boolean(displayName) && displayName === "Unknown";
    if(!isUnknown) {
        return displayName;
    }
    if(typeof SourceComponent === "object") {
        if((SourceComponent as FunctionComponent<T>).displayName) {
            return (SourceComponent as FunctionComponent<T>).displayName ?? null;
        }
        
        if((SourceComponent as ExoticComponent<T>).$$typeof) {
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

function withDisplayName<T>(prefix: string | null = null) {
    return (WrappedComponent: ComponentType<T>): ExoticComponent<T> => {
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

export default withDisplayName;
