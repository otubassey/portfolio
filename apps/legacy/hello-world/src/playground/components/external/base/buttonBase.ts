import { fromJS } from "immutable";

import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes} from "../../common";

const ButtonBase: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Button Base",
    elementName: "button",
    element: "ButtonBase",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        {
            id: generateId(),
            displayName: "Children as Text",
            elementName: "children",
            element: "Input",
            category: Category.PLAYGROUND_COMPONENT,
            value: "Button Text"
        }
    ],
    children: []
});

export default ButtonBase;
