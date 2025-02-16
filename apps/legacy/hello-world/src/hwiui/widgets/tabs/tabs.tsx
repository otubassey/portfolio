import {
    ChangeEvent,
    Children,
    ForwardedRef,
    ReactNode,
    SyntheticEvent,
    cloneElement,
    forwardRef,
    isValidElement,
    useCallback
} from "react";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

import { ValuesOf } from "../common";

export const TabsOrientation = {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
} as const;

const FlexDirectionByOrientation = {
    [TabsOrientation.HORIZONTAL]: "grid-flow-col",
    [TabsOrientation.VERTICAL]: "grid-flow-row"
} as const;

function mapOrientation(orientation?: ValuesOf<typeof TabsOrientation>): string {
    if(orientation === TabsOrientation.VERTICAL) {
        return FlexDirectionByOrientation[TabsOrientation.VERTICAL];
    }
    return FlexDirectionByOrientation[TabsOrientation.HORIZONTAL];
}

type TabsProps = {
    children?: ReactNode;
    className?: string;
    onChange?: (event: SyntheticEvent, value: any) => void;
    orientation?: ValuesOf<typeof TabsOrientation>;
    value?: any;
};

const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
    children: childrenProp,
    className,
    onChange,
    orientation,
    value
}: TabsProps, ref: ForwardedRef<HTMLDivElement>) => {
    const handleChange = useCallback((event: ChangeEvent<HTMLButtonElement>) => {
        onChange?.(event, event.target.value);
    }, [onChange]);
    const isVerticalOrientation = orientation === TabsOrientation.VERTICAL;
    let nextChildIndexAsValue = 0;
    return (
        <div
            ref={ref}
            className={ClassesUtils.merge(
                className,
                "grid gap-x-0.5",
                mapOrientation(orientation)
            )}>
            {
                Children.map(childrenProp, (child, index) => {
                    if(!isValidElement(child)) {
                        return null;
                    }
            
                    const childValue = [undefined, null].includes(child.props.value) ? nextChildIndexAsValue : child.props.value;
                    const selected = childValue === value || index === 1;
            
                    nextChildIndexAsValue += 1;
                    const clonedKid = cloneElement(child, {
                        ...(selected && isVerticalOrientation ? {className: "w-full"} : {}),
                        selected,
                        onClick: handleChange,
                        value: childValue,
                        ...(nextChildIndexAsValue === 1 && value === false && !child.props.tabIndex ? { tabIndex: 0 } : {})
                    });

                    return (
                        <div className={ClassesUtils.merge(
                            [isVerticalOrientation ? "flex flex-row h-fit" : "flex flex-col h-fit"]
                        )}>
                            {clonedKid}
                            {
                                selected && !child.props.disabled &&
                                <span className={ClassesUtils.merge(
                                    "bg-primary",
                                    [isVerticalOrientation ? "w-0.5 h-auto" : "h-0.5 w-full"]
                                )}></span>
                            }
                        </div>
                    );
                })
            }
        </div>
    );
});

Tabs.displayName = getDisplayName(Tabs);

Tabs.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onChange: PropTypes.func,
    orientation: PropTypes.oneOf(Object.values(TabsOrientation)),
    value: PropTypes.any
};

export default Tabs;
