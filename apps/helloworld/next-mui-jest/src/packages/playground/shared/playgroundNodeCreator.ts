import { List as ImmutableList } from "immutable";

import { HwiuiIconNameValues } from "@/packages/hwiui";
import { generateId } from "@/packages/hwiutils";
import {
    ChoicePlaygroundAttributes,
    createPlaygroundAttributesRecordFactory,
    ElementPlaygroundAttributes,
    FragmentPlaygroundAttributes,
    IconPlaygroundAttributes,
    InputPlaygroundAttributes,
    PlaygroundAttributesRecord,
    PlaygroundAttributesRecordList,
    TextPlaygroundAttributes
} from "./playgroundAttributes";
import {PlaygroundNodeCategory, PlaygroundNodeType} from "./playgroundType";

class PlaygroundNodeCreator {

    createChoiceGroup<Value>(attributes: Partial<ChoicePlaygroundAttributes<Value>>): PlaygroundAttributesRecord {
        const {additionalAttributes, children, multiple, row, ...otherAttributes} = attributes ?? {};

        const defaultInputValue = this.#createDefaultInputPlaygroundAttributes<Value>();
        const ChoiceNodeAttributesRecordFactory = createPlaygroundAttributesRecordFactory<ChoicePlaygroundAttributes<Value>>({
            ...defaultInputValue,
            nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
            nodeType: PlaygroundNodeType.CHOICE,
            row: false
        });

        return new ChoiceNodeAttributesRecordFactory({
            value: null,
            ...otherAttributes,
            additionalAttributes: ImmutableList([
                ...(additionalAttributes ?? ImmutableList<PlaygroundAttributesRecord>()),
                this.createLabelledValue<boolean>({
                    label: "multiple",
                    nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT_PROPS,
                    type: "boolean",
                    value: Boolean(multiple)
                }),
                this.createLabelledValue<boolean>({
                    label: "row",
                    nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT_PROPS,
                    type: "boolean",
                    value: Boolean(row)
                })
            ]),
            children: children ?? ImmutableList<PlaygroundAttributesRecord>(),
            elementName: "ChoiceGroup",
            id: generateId(),
            multiple,
            nodeType: PlaygroundNodeType.CHOICE,
            row
        });
    }

    createElement<Value>(attributes: Partial<ElementPlaygroundAttributes<Value>>): PlaygroundAttributesRecord {
        const {additionalAttributes, children, ...otherAttributes} = attributes ?? {};

        const ElementNodeAttributesRecordFactory = createPlaygroundAttributesRecordFactory<ElementPlaygroundAttributes<Value>>(
            this.#createDefaultElementPlaygroundAttributes<Value>()
        );

        return new ElementNodeAttributesRecordFactory({
            ...otherAttributes,
            additionalAttributes: additionalAttributes ?? ImmutableList<PlaygroundAttributesRecord>(),
            children: children ?? ImmutableList<PlaygroundAttributesRecord>(),
            id: generateId()
        });
    }

    createFragment(children: PlaygroundAttributesRecordList): PlaygroundAttributesRecord {
        const FragmentNodeAttributesRecordFactory = createPlaygroundAttributesRecordFactory<FragmentPlaygroundAttributes>({
            id: "",
            additionalAttributes: ImmutableList<PlaygroundAttributesRecord>(),
            children: ImmutableList<PlaygroundAttributesRecord>(),
            elementName: "",
            nodeCategory: PlaygroundNodeCategory.DATA_COMPONENT,
            nodeType: PlaygroundNodeType.FRAGMENT
        });

        return new FragmentNodeAttributesRecordFactory({
            id: generateId(),
            children: children ?? ImmutableList<PlaygroundAttributesRecord>()
        });
    }

    createIcon<Value>(
        attributes: Partial<IconPlaygroundAttributes<Value>>
    ): PlaygroundAttributesRecord {
        const {additionalAttributes, name, ...otherAttributes} = attributes ?? {};

        const elementDefaultValue = this.#createDefaultElementPlaygroundAttributes<Value>();
        const IconNodeAttributesRecordFactory = createPlaygroundAttributesRecordFactory<IconPlaygroundAttributes<Value>>({
            ...elementDefaultValue,
            name: "sickOutlined",
            nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
            nodeType: PlaygroundNodeType.ICON
        });

        return new IconNodeAttributesRecordFactory({
            ...otherAttributes,
            additionalAttributes: ImmutableList([
                ...(additionalAttributes ?? ImmutableList<PlaygroundAttributesRecord>()),
                this.createLabelledValue<HwiuiIconNameValues>({
                    label: "name",
                    nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT_PROPS,
                    type: "text",
                    value: name ?? "sickOutlined"
                })
            ]),
            elementName: "HwiuiIcon",
            id: generateId(),
            name
        });
    }

    createInput<Value>(attributes: Partial<InputPlaygroundAttributes<Value>>): PlaygroundAttributesRecord {
        const {additionalAttributes, children, ...otherAttributes} = attributes ?? {};

        const InputNodeAttributesRecordFactory = createPlaygroundAttributesRecordFactory<InputPlaygroundAttributes<Value>>(
            this.#createDefaultInputPlaygroundAttributes<Value>()
        );

        return new InputNodeAttributesRecordFactory({
            ...otherAttributes,
            additionalAttributes: additionalAttributes ?? ImmutableList<PlaygroundAttributesRecord>(),
            children: children ?? ImmutableList<PlaygroundAttributesRecord>(),
            id: generateId()
        });
    }

    createLabelledValue<Value>(attributes: Partial<InputPlaygroundAttributes<Value>> & Required<Pick<InputPlaygroundAttributes<Value>, "label">>): PlaygroundAttributesRecord {
        return this.createInput<Value>({
            value: null,
            ...attributes,
            id: generateId(),
            nodeType: PlaygroundNodeType.TEXT
        });
    }

    createSelect<Value>(attributes: Partial<InputPlaygroundAttributes<Value>>): PlaygroundAttributesRecord {
        return this.createInput<Value>({
            value: null,
            ...attributes,
            id: generateId(),
            elementName: "Select",
            nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
            nodeType: PlaygroundNodeType.INPUT
        });
    }

    createSwitch<Value>(attributes: Partial<InputPlaygroundAttributes<Value>>): PlaygroundAttributesRecord {
        return this.createInput<Value>({
            value: null,
            ...attributes,
            id: generateId(),
            elementName: "Switch",
            nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
            nodeType: PlaygroundNodeType.INPUT
        });
    }

    createText<Value>(attributes: Partial<TextPlaygroundAttributes<Value>>): PlaygroundAttributesRecord {
        const TextNodeAttributesRecordFactory = createPlaygroundAttributesRecordFactory<TextPlaygroundAttributes>({
            id: "",
            additionalAttributes: ImmutableList<PlaygroundAttributesRecord>(),
            children: ImmutableList<PlaygroundAttributesRecord>(),
            clickable: false,
            disabled: false,
            elementName: "Text",
            enablePropsInteraction: false,
            label: "",
            nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
            nodeType: PlaygroundNodeType.TEXT,
            value: null
        });

        return new TextNodeAttributesRecordFactory({
            ...attributes,
            id: generateId()
        });
    }

    #createDefaultElementPlaygroundAttributes<Value>(attributes?: Partial<ElementPlaygroundAttributes<Value>>): ElementPlaygroundAttributes<Value> {
        return {
            id: "",
            additionalAttributes: ImmutableList<PlaygroundAttributesRecord>(),
            children: ImmutableList<PlaygroundAttributesRecord>(),
            elementName: "",
            enablePropsInteraction: false,
            label: "",
            name: "",
            nodeCategory: PlaygroundNodeCategory.DATA_COMPONENT,
            nodeType: PlaygroundNodeType.ELEMENT,
            title: "",
            ...attributes
        };
    }

    #createDefaultInputPlaygroundAttributes<Value>(
        attributes?: Partial<InputPlaygroundAttributes<Value>>
    ): InputPlaygroundAttributes<Value> {
        return {
            id: "",
            additionalAttributes: ImmutableList<PlaygroundAttributesRecord>(),
            checked: false,
            children: ImmutableList<PlaygroundAttributesRecord>(),
            disabled: false,
            elementName: "",
            enablePropsInteraction: false,
            label: "",
            multiple: false,
            name: "",
            nodeCategory: PlaygroundNodeCategory.DATA_COMPONENT,
            nodeType: PlaygroundNodeType.INPUT,
            placeholder: "",
            required: false,
            title: "",
            type: "text",
            value: undefined,
            ...attributes
        };
    }

}

export default new PlaygroundNodeCreator();
