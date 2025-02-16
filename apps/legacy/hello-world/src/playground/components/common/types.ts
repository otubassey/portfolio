import { HTMLAttributes, InputHTMLAttributes } from "react";
import Immutable, {List as ImmutableList, Map as ImmutableMap} from "immutable";

import { ValuesOf } from "@/hwiui/widgets/common";
import Category from "./category";

type AllHTMLAttributes = HTMLAttributes<HTMLElement> & InputHTMLAttributes<HTMLElement>;

export type PropNameAttributes = Omit<keyof PlaygroundAttributes, "additionalAttributes" | "category" | "displayName" | "element" | "elementName" | "propNames">;

export type PlaygroundAttributes = Omit<AllHTMLAttributes, "children" | "value"> & {
    /**
     * Attributes specific to a particular element are defined in this list.
     * String values represent current HTMLAttributes that need to be included as props to a component
     */
    additionalAttributes?: Immutable.List<PlaygroundAttributes | string>;
    /**
     * Represents the playground's version of nodeType
     */
    category: ValuesOf<typeof Category>;
    children?: Immutable.List<PlaygroundAttributes>;
    // dataAttributes?: Immutable.List<PlaygroundAttributes>;
    displayName?: string;
    element: string;
    /**
     * Replaces the "name" attribute in the playground,
     * thereby freeing that attribute to be used as prop, if need be
     */
    elementName?: string;
    /**
     * Indicates the node that is currently being examined. Helps to know what node to be displayed by PropsEditor
     */
    isExaminedNode?: boolean;
    /**
     * Names of properties on the element to be included in props
     */
    propNames?: Immutable.List<PropNameAttributes>; // propDefintions? - if we need more than a list of strings
    value?: string | number | string[] | undefined | boolean | null | PlaygroundAttributes;
};

export type ImmutablePlaygroundAttributes = Immutable.Map<keyof PlaygroundAttributes, PlaygroundAttributes[keyof PlaygroundAttributes]>;






// TODO: fix this typing confusion: why is immutable used for attributes and children?
// export type PlaygroundNodeAttributes = HTMLAttributes<HTMLElement> & InputHTMLAttributes<HTMLElement> & {
//     /**
//      * For labels
//      */
//     displayName?: string;
//     /**
//      * Match to a ComponentName, HTMLElement tag, or Primitive types such as string, number, boolean, Symbol, etc...
//      */
//     element: string;
//     /**
//      * Match to a ComponentName, HTMLElement tag, or Primitive
//      */
//     category: ValuesOf<typeof Category>;
//     /**
//      * the props, if you will, of any Component or HTMLElement
//      */
//     attributes?: ImmutableList<PlaygroundNodeAttributes>;
//     /**
//      * the children, if you will, of any Component or HTMLElement
//      */
//     children?: ImmutableList<PlaygroundNodeAttributes>;
// };

// export type PlaygroundNode = ImmutableMap<keyof PlaygroundNodeAttributes, PlaygroundNodeAttributes[keyof PlaygroundNodeAttributes]>;

// export type PlaygroundNodeProps = {
//     [key: string]: any;
// };

