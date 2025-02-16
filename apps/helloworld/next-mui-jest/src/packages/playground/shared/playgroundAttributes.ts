import { HTMLInputTypeAttribute } from "react";
import { List as ImmutableList, Record as ImmutableRecord } from "immutable";

import { HwiuiIconNameValues } from "@/packages/hwiui";
import {PlaygroundNodeCategory, PlaygroundNodeType} from "./playgroundType";

interface AbstractPlaygroundAttributes {
    /**
     * Returns the {@link PlaygroundNodeCategory}. This is a readonly field.
     */
    readonly nodeCategory: typeof PlaygroundNodeCategory[keyof typeof PlaygroundNodeCategory];
    /**
     * The name of the HTML element or Component (from external libraries like Material-UI or internal variants or components) to render.
     * 
     * **Valid Values:**
     * - Standard HTML tag names (such as: 'div', 'span', 'p', etc...)
     * - Component element names (such as: 'Button', 'AppBar', 'Typography', etc...)
     * - null indicates the element
     */
    readonly elementName: string;
    readonly id: string;
    /**
     * Returns the type of {@link PlaygroundNodeType}. This is a readonly field.
     */
    readonly nodeType: typeof PlaygroundNodeType[keyof typeof PlaygroundNodeType];
}

interface BasePlaygroundAttributes extends AbstractPlaygroundAttributes {
    /**
     * Attributes specific to a particular element are defined in this {@link ImmutableList}.
     */
    additionalAttributes?: PlaygroundAttributesRecordList;
    /**
     * Returns an {@link ImmutableList} of child PlaygroundElements
     */
    children?: PlaygroundAttributesRecordList;
}

interface BasePlaygroundDataAttributes<Value = any> extends BasePlaygroundAttributes {
    readonly label: string;
    // TODO: remove title? label vs title?
    readonly title: string;
    name?: string | undefined;
    value?: Value | null;
}

const createPlaygroundAttributesRecordFactory = <T extends AbstractPlaygroundAttributes>(defaultAttributes: T) => ImmutableRecord<T>(defaultAttributes);

type ReadonlyImmutableRecord<T extends AbstractPlaygroundAttributes> = ImmutableRecord<T> & Readonly<T>;

type ButtonPlaygroundAttributesRecord = ReadonlyImmutableRecord<ButtonPlaygroundAttributes>;
type ChoicePlaygroundAttributesRecord = ReadonlyImmutableRecord<ChoicePlaygroundAttributes>;
type ElementPlaygroundAttributesRecord = ReadonlyImmutableRecord<ElementPlaygroundAttributes>;
type FragmentPlaygroundAttributesRecord = ReadonlyImmutableRecord<FragmentPlaygroundAttributes>;
type IconPlaygroundAttributesRecord = ReadonlyImmutableRecord<IconPlaygroundAttributes>;
type InputPlaygroundAttributesRecord = ReadonlyImmutableRecord<InputPlaygroundAttributes>;
type TextPlaygroundAttributesRecord = ReadonlyImmutableRecord<TextPlaygroundAttributes>;

type PlaygroundAttributesRecord = ButtonPlaygroundAttributesRecord
    | ChoicePlaygroundAttributesRecord
    | ElementPlaygroundAttributesRecord
    | FragmentPlaygroundAttributesRecord
    | IconPlaygroundAttributesRecord
    | InputPlaygroundAttributesRecord
    | TextPlaygroundAttributesRecord;

type PlaygroundAttributesRecordList<T extends PlaygroundAttributesRecord = PlaygroundAttributesRecord> = ImmutableList<T>;

interface ElementPlaygroundAttributes<Value = any> extends BasePlaygroundDataAttributes<Value> {
    /**
     * Indicates whether the node's properties should be editable and interactive in the UI.
     * When set to `true`, the node's properties can be viewed and modified in the UI, allowing for experimentation and customization. 
     */
    readonly enablePropsInteraction: boolean;
    /**
     * Returns the {@link PlaygroundNodeType}. This is a readonly field.
     * This will always return "element".
     */
    readonly nodeType: typeof PlaygroundNodeType["ELEMENT" | "FRAGMENT" | "ICON"];
}

interface FragmentPlaygroundAttributes extends BasePlaygroundAttributes {
    /**
     * Returns the {@link PlaygroundNodeType}. This is a readonly field.
     * This will always return "fragment".
     */
    readonly nodeType: typeof PlaygroundNodeType["FRAGMENT"];
}

interface InputPlaygroundAttributes<Value = any> extends BasePlaygroundDataAttributes<Value> {
    /**
     * Indicates whether the node's properties should be editable and interactive in the UI.
     * When set to `true`, the node's properties can be viewed and modified in the UI, allowing for experimentation and customization. 
     */
    readonly enablePropsInteraction: boolean;
    /**
     * Returns the {@link PlaygroundNodeType}. This is a readonly field.
     * This will always return "input".
     */
    readonly nodeType: typeof PlaygroundNodeType["CHOICE" | "INPUT" | "TEXT"];
    checked?: boolean | undefined;
    disabled?: boolean | undefined;
    multiple?: boolean | undefined;
    placeholder?: string | undefined;
    required?: boolean | undefined;
    type?: HTMLInputTypeAttribute | undefined;
}

interface ButtonPlaygroundAttributes<Value = any> extends Omit<InputPlaygroundAttributes<Value>, "nodeType"> {
    /**
     * Returns the {@link PlaygroundNodeType}. This is a readonly field.
     * This will always return "fragment".
     */
    readonly nodeType: typeof PlaygroundNodeType["INPUT"];
    color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
    endIcon?: IconPlaygroundAttributesRecord | undefined;
    fullWidth?: boolean | undefined;
    size?: "small" | "medium" | "large";
    startIcon?: IconPlaygroundAttributesRecord | undefined;
    variant?: "contained" | "outlined" | "text";
};

interface ChoicePlaygroundAttributes<Value = any> extends Omit<InputPlaygroundAttributes<Value>, "nodeType"> {
    /**
     * Returns the {@link PlaygroundNodeType}. This is a readonly field.
     * This will always return "fragment".
     */
    readonly nodeType: typeof PlaygroundNodeType["CHOICE"];
    row?: boolean | undefined;
};

interface IconPlaygroundAttributes<Value = any> extends Omit<ElementPlaygroundAttributes<Value>, "name" | "nodeType"> {
    /**
     * Returns the {@link PlaygroundNodeType}. This is a readonly field.
     * This will always return "fragment".
     */
    readonly nodeType: typeof PlaygroundNodeType["ICON"];
    name: HwiuiIconNameValues;
};

interface TextPlaygroundAttributes<Value = any> extends Omit<ElementPlaygroundAttributes<Value>, "name" | "nodeCategory" | "nodeType" | "title"> {
    readonly nodeCategory: typeof PlaygroundNodeCategory["PLAYGROUND_COMPONENT"];
    /**
     * Returns the {@link PlaygroundNodeType}. This is a readonly field.
     * This will always return "fragment".
     */
    readonly nodeType: typeof PlaygroundNodeType["TEXT"];
    clickable?: boolean | undefined;
    color?: string | undefined;
    disabled?: boolean | undefined;
};

type PlaygroundDataAttributes = ChoicePlaygroundAttributes | ElementPlaygroundAttributes | IconPlaygroundAttributes | InputPlaygroundAttributes | TextPlaygroundAttributes;
type PlaygroundAttributes = PlaygroundDataAttributes | FragmentPlaygroundAttributes;

export type {
    AbstractPlaygroundAttributes,
    BasePlaygroundAttributes,
    BasePlaygroundDataAttributes,
    ButtonPlaygroundAttributes,
    ButtonPlaygroundAttributesRecord,
    ChoicePlaygroundAttributes,
    ChoicePlaygroundAttributesRecord,
    ElementPlaygroundAttributes,
    ElementPlaygroundAttributesRecord,
    FragmentPlaygroundAttributes,
    FragmentPlaygroundAttributesRecord,
    IconPlaygroundAttributes,
    IconPlaygroundAttributesRecord,
    InputPlaygroundAttributes,
    InputPlaygroundAttributesRecord,
    PlaygroundAttributes,
    PlaygroundDataAttributes,
    PlaygroundAttributesRecord,
    PlaygroundAttributesRecordList,
    TextPlaygroundAttributes,
    TextPlaygroundAttributesRecord
};

export {
    createPlaygroundAttributesRecordFactory
};
