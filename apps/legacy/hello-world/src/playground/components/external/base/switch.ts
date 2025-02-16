import { fromJS } from "immutable";

import { LabelPosition, SwitchSize } from "@/hwiui/widgets/switch/switch";
import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

const Switch: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Switch",
    elementName: "switch",
    element: "Switch",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        PlaygroundCreator?.createSwitchElement({
            displayName: "checked",
            elementName: "checked"
        }),
        PlaygroundCreator?.createInputElement({
            displayName: "label",
            elementName: "label",
            value: ""
        }),
        {
            id: generateId(),
            displayName: "Label Props",
            elementName: "labelProps",
            element: "List",
            category: Category.PLAYGROUND_COMPONENT,
            children: [
                {
                    id: generateId(),
                    elementName: "position",
                    element: "ListItem",
                    category: Category.PLAYGROUND_COMPONENT,
                    additionalAttributes: [
                        PlaygroundCreator?.createSelectElement(
                            {
                                displayName: "position",
                                elementName: "control",
                                value: LabelPosition.START
                            },
                            Object.entries(LabelPosition)
                        ),
                        {
                            id: generateId(),
                            elementName: "labelPlacement",
                            element: "string",
                            category: Category.PRIMITIVE,
                            value: "start"
                        },
                        {
                            id: generateId(),
                            elementName: "label",
                            element: "string",
                            category: Category.PRIMITIVE,
                            value: "position"
                        }
                    ],
                    value: LabelPosition.START
                }
            ],
            value: null
        },
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "size",
                elementName: "size",
                value: SwitchSize.SM
            },
            Object.entries(SwitchSize)
        )
    ],
    children: [],
    value: false
});

export default Switch;
