import { ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { getDisplayName } from "@/hwiui/decorator";
import { ClassesUtils } from "@/hwiutils";

import { ListComponentContext } from "./useListContext";
import { ValuesOf } from "../common";

export const ListStylePosition = {
    INHERIT: "inherit",
    INITIAL: "initial",
    INSIDE: "inside",
    OUTSIDE: "outside"
} as const;

const ClassNameByStylePosition: {[key: typeof ListStylePosition[keyof typeof ListStylePosition] | string]: string} = {
    [ListStylePosition.INHERIT]: "list-[inherit]",
    [ListStylePosition.INITIAL]: "list-[initial]",
    [ListStylePosition.INSIDE]: "list-inside",
    [ListStylePosition.OUTSIDE]: "list-outside"
} as const;

export const CustomListStyleType = {
    STRETCH: "stretch"
} as const;

export const ListStyleType = {
    AUTO: "auto",
    CIRCLE: "circle",
    DECIMAL: "decimal",
    DISC: "disc",
    INHERIT: "inherit",
    INITIAL: "initial",
    SQUARE: "square",
    NONE: "none",
    ...CustomListStyleType
} as const;

const ClassNameByStyleType: {[key: typeof ListStyleType[keyof typeof ListStyleType] | string]: string} = {
    [ListStyleType.AUTO]: "list-[auto]",
    [ListStyleType.CIRCLE]: "list-[circle]",
    [ListStyleType.DECIMAL]: "list-decimal",
    [ListStyleType.DISC]: "list-disc",
    [ListStyleType.INHERIT]: "list-[inherit]",
    [ListStyleType.INITIAL]: "list-[initial]",
    [ListStyleType.SQUARE]: "list-[square]",
    [ListStyleType.NONE]: "list-none"
} as const;

export type Props = {
    children?: ReactNode;
    className?: string | null;
    component?: ElementType | null;
    listStylePosition?: ValuesOf<typeof ListStylePosition>;
    listStyleType?: ValuesOf<typeof ListStyleType>;
};

const List = forwardRef<Element, Props>(({
    children = null,
    className = null,
    component = null,
    listStylePosition: listStylePositionProp,
    listStyleType: listStyleTypeProp,
    ...otherProps
}: Props, ref: ForwardedRef<Element>) => {
    const Component = component ?? "ul";
    const listStylePosition = listStylePositionProp ?? ListStylePosition.OUTSIDE;
    const listStyleType = listStyleTypeProp ?? ListStyleType.NONE;
    return (
        <ListComponentContext.Provider value={Immutable.Map({listStylePosition, listStyleType})}>
            <Component
                ref={ref}
                className={ClassesUtils.merge(
                    className,
                    ClassNameByStylePosition[listStylePosition],
                    [CustomListStyleType.STRETCH === listStyleType ? ClassNameByStyleType[ListStyleType.NONE] : ClassNameByStyleType[listStyleType]]
                )}
                {...otherProps}>
                {children}
            </Component>
        </ListComponentContext.Provider>
    );
});

List.displayName = getDisplayName(List);

List.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    component: PropTypes.elementType,
    listStylePosition: PropTypes.oneOf(Object.values(ListStylePosition)),
    listStyleType: PropTypes.oneOf(Object.values(ListStyleType))
};

export default List;
