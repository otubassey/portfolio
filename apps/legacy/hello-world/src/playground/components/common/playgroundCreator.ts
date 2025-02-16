import Immutable from "immutable";

import { generateId, StringUtil } from "@/hwiutils";
import Category from "./category";
import { PlaygroundAttributes, ImmutablePlaygroundAttributes } from "./types";

class PlaygroundCreator {
    createChoiceItemInputElement(attributes: Partial<PlaygroundAttributes>): ImmutablePlaygroundAttributes {
        const {category, checked, displayName, element, elementName, value, ...otherAttributes} = attributes ?? {};
        return this.createElement({
            id: generateId(),
            checked: checked ?? false,
            children: [
                this.createInputElement({
                    elementName,
                    type: "text",
                    value
                })
            ],
            displayName,
            elementName,
            element: "ChoiceItem",
            category: Category.PLAYGROUND_COMPONENT,
            value: value ?? "",
            ...otherAttributes
        });
    }

    createChoiceItemSelectElement(attributes: Partial<PlaygroundAttributes>, entries?: [string, unknown][]): ImmutablePlaygroundAttributes {
        const {category, checked, children, displayName, element, elementName, value, ...otherAttributes} = attributes ?? {};
        return this.createElement({
            id: generateId(),
            checked: checked ?? false,
            children: children ?? [
                this.createSelectElement(
                    {
                        displayName,
                        elementName,
                        value
                    },
                    entries
                )
            ],
            elementName,
            element: "ChoiceItem",
            category: Category.PLAYGROUND_COMPONENT,
            value,
            ...otherAttributes
        });
    }
    
    createChoiceItemTextElement(attributes: Partial<PlaygroundAttributes>): ImmutablePlaygroundAttributes {
        const {category, checked, displayName, element, elementName, value, ...otherAttributes} = attributes ?? {};
        return this.createElement({
            id: generateId(),
            checked: checked ?? false,
            displayName,
            elementName,
            element: "ChoiceItemText",
            category: Category.PLAYGROUND_COMPONENT,
            value: value ?? "",
            ...otherAttributes
        });
    }

    createElement(attributes: PlaygroundAttributes): ImmutablePlaygroundAttributes {
        return Immutable.fromJS({...attributes}) as ImmutablePlaygroundAttributes;
    }

    createInputElement(attributes: Partial<PlaygroundAttributes>): ImmutablePlaygroundAttributes {
        const {category, displayName, element, elementName, placeholder, type, value, ...otherAttributes} = attributes ?? {};
        return this.createElement({
            id: generateId(),
            category: Category.PLAYGROUND_COMPONENT,
            displayName,
            elementName,
            element: "Input",
            placeholder: placeholder ?? "Enter a text",
            propNames: ["value"],
            type: type ?? "text",
            value: value ?? "",
            ...otherAttributes
        });
    }

    createSelectElement(attributes: Partial<PlaygroundAttributes>, entries?: [string, unknown][]): ImmutablePlaygroundAttributes {
        const {category, children, displayName, element, elementName, value, ...otherAttributes} = attributes ?? {};
        return this.createElement({
            id: generateId(),
            children: children ?? entries?.map(([key, entryValue]) => ({
                id: generateId(),
                displayName: StringUtil.capitalize(key),
                elementName: StringUtil.capitalize(key),
                element: "option",
                category: Category.ELEMENT,
                propNames: ["value"],
                children: [
                    {
                        id: generateId(),
                        element: "string",
                        category: Category.PRIMITIVE,
                        value: entryValue
                    }
                ],
                value: entryValue
            })) ?? [],
            displayName,
            elementName,
            element: "Select",
            category: Category.PLAYGROUND_COMPONENT,
            value,
            ...otherAttributes
        });
    }

    createSwitchElement(attributes: Partial<PlaygroundAttributes>): ImmutablePlaygroundAttributes {
        const {category, displayName, element, elementName, value, ...otherAttributes} = attributes ?? {};
        return this.createElement({
            id: generateId(),
            displayName,
            elementName,
            element: "Switch",
            category: Category.PLAYGROUND_COMPONENT,
            value: value ?? false,
            ...otherAttributes
        });
    }
}

export default new PlaygroundCreator();
