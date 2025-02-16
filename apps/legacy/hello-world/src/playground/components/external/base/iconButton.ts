import { fromJS } from "immutable";

import { IconButtonColor, IconButtonSize } from "@/hwiui/widgets/button/iconButton";
import { IconName } from "@/hwiui/widgets/icon";
import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator, } from "../../common";

const IconButton: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Icon Button",
    elementName: "iconButton",
    element: "IconButton",
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
                    Object.entries(IconButtonColor)
                ),
                PlaygroundCreator?.createChoiceItemInputElement({
                    elementName: "color"
                })
            ],
            value: IconButtonColor.DEFAULT
        },
        PlaygroundCreator?.createSwitchElement({
            displayName: "disableRipple",
            elementName: "disableRipple"
        }),
        PlaygroundCreator?.createSwitchElement({
            displayName: "disabled",
            elementName: "disabled"
        }),
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "Icon Name",
                elementName: "name",
                value: IconName.SAD_FACE_EMOJI
            },
            Object.entries(IconName)
        ),
        {
            id: generateId(),
            displayName: "size",
            elementName: "size",
            element: "Choice",
            category: Category.PLAYGROUND_COMPONENT,
            children: [
                PlaygroundCreator?.createChoiceItemSelectElement(
                    {
                        checked: true,
                        elementName: "size",
                        value: IconButtonSize.MEDIUM
                    },
                    Object.entries(IconButtonSize)
                ),
                PlaygroundCreator?.createChoiceItemInputElement({
                    elementName: "size"
                })
            ],
            value: IconButtonSize.MEDIUM
        }
    ],
    children: []
});

export default IconButton;
