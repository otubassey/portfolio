import { List as ImmutableList } from "immutable";

import { HwiuiIconName, HwiuiIconNameValues } from "@/packages/hwiui";
import { PlaygroundNodeCategory, PlaygroundNodeCreator } from "@/packages/playground";

const ToggleButtonNode = PlaygroundNodeCreator.createInput({
    elementName: "ToggleButton",
    enablePropsInteraction: true,
    label: "toggleButton",
    nodeCategory: PlaygroundNodeCategory.HWIUI_COMPONENT,
    title: "Toggle Button",
    type: "radio",
    additionalAttributes: ImmutableList([
        PlaygroundNodeCreator.createChoiceGroup<string>({
            label: "children",
            children: ImmutableList([
                PlaygroundNodeCreator.createInput({
                    children: ImmutableList([
                        PlaygroundNodeCreator.createText<string>({
                            clickable: true,
                            label: "None",
                            value: ""
                        })
                    ]),
                    elementName: "Choice",
                    nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
                    type: "choice",
                    value: ""
                }),
                PlaygroundNodeCreator.createInput({
                    children: ImmutableList([
                        PlaygroundNodeCreator.createText<string>({
                            clickable: true,
                            label: "Random Text",
                            value: "Random Text"
                        })
                    ]),
                    elementName: "Choice",
                    nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
                    type: "choice",
                    value: "Random Text"
                })
            ]),
            multiple: false,
            nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
            row: false,
            value: ""
        }),
        PlaygroundNodeCreator.createSelect<string>({
            label: "defaultNode",
            children: ImmutableList(HwiuiIconName.slice(0, 2).map((iconName) => (
                PlaygroundNodeCreator.createLabelledValue({
                    label: iconName,
                    value: PlaygroundNodeCreator.createIcon({
                        name: iconName as HwiuiIconNameValues
                    })
                })
            ))),
            multiple: false,
            nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
            type: "select",
            value: ""
        }),
        PlaygroundNodeCreator.createSwitch<boolean>({
            checked: false,
            label: "selected",
            name: "selected",
            value: false
        }),
        PlaygroundNodeCreator.createSelect<string>({
            label: "selectedNode",
            children: ImmutableList(HwiuiIconName.slice(0, 2).map((iconName) => (
                PlaygroundNodeCreator.createLabelledValue({
                    label: iconName,
                    value: PlaygroundNodeCreator.createIcon({
                        name: iconName as HwiuiIconNameValues
                    })
                })
            ))),
            multiple: false,
            nodeCategory: PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
            type: "select",
            value: ""
        })
    ])
});

export default ToggleButtonNode;
