import { fromJS } from "immutable";

import { ButtonColor, ButtonSize, ButtonVariant } from "@/hwiui/widgets/button";
import { IconName } from "@/hwiui/widgets/icon";
import generateId from "@/hwiutils/generateId/generateId";

import ButtonBase from "./buttonBase";
import { Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

const Button: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Button",
    elementName: "button",
    element: "Button",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        ...ButtonBase.get("additionalAttributes"),
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
                        elementName: "color",
                        value: ButtonColor.PRIMARY
                    },
                    Object.entries(ButtonColor)
                ),
                PlaygroundCreator?.createChoiceItemInputElement({
                    elementName: "color"
                })
            ],
            value: ButtonColor.PRIMARY
        },
        PlaygroundCreator?.createSwitchElement({ // TODO: fix optional chaining
            displayName: "disableRipple",
            elementName: "disableRipple"
        }),
        PlaygroundCreator?.createSwitchElement({
            displayName: "disabled",
            elementName: "disabled"
        }),
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "endIcon",
                elementName: "endIcon",
                additionalAttributes: [
                    {
                        id: generateId(),
                        elementName: "displayEmpty",
                        element: "boolean",
                        category: Category.PRIMITIVE,
                        value: true
                    }
                ]
            },
            Object.entries(IconName)
        ),
        PlaygroundCreator?.createSwitchElement({
            displayName: "fullWidth",
            elementName: "fullWidth"
        }),
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "size",
                elementName: "size",
                value: ButtonSize.MEDIUM
            },
            Object.entries(ButtonSize)
        ),
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "startIcon",
                elementName: "startIcon",
                additionalAttributes: [
                    {
                        id: generateId(),
                        elementName: "displayEmpty",
                        element: "boolean",
                        category: Category.PRIMITIVE,
                        value: true
                    }
                ],
            },
            Object.entries(IconName)
        ),
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "variant",
                elementName: "variant",
                value: ButtonVariant.TEXT
            },
            Object.entries(ButtonVariant)
        )
    ],
    children: []
});

export default Button;
