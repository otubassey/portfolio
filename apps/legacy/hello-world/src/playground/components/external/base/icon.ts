import { fromJS } from "immutable";

import { IconColor, IconName, IconSize } from "@/hwiui/widgets/icon";
import { generateId } from "@/hwiutils";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

const Icon: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Icon",
    elementName: "icon",
    element: "Icon",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        {
            id: generateId(),
            displayName: "color",
            elementName: "color",
            element: "Choice",
            category: Category.PLAYGROUND_COMPONENT,
            children: [
                PlaygroundCreator?.createChoiceItemSelectElement(
                    {
                        checked: true,
                        elementName: "color"
                    },
                    Object.entries(IconColor)
                ),
                PlaygroundCreator?.createChoiceItemInputElement({
                    elementName: "color"
                })
            ],
            value: IconColor.INHERIT
        },
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "name",
                elementName: "name",
                value: IconName.SAD_FACE_EMOJI
            },
            Object.entries(IconName)
        ),
        {
            id: generateId(),
            displayName: "Size",
            elementName: "size",
            element: "Choice",
            category: Category.PLAYGROUND_COMPONENT,
            additionalAttributes: [],
            children: [
                PlaygroundCreator?.createChoiceItemSelectElement(
                    {
                        checked: true,
                        elementName: "size"
                    },
                    Object.entries(IconSize)
                ),
                PlaygroundCreator?.createChoiceItemInputElement({
                    elementName: "size"
                })
            ],
            value: IconSize.MEDIUM
        }
    ],
    value: false
});

export default Icon;
