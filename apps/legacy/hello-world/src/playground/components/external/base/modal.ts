import { fromJS } from "immutable";

import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

const Modal: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Modal",
    elementName: "Modal",
    element: "Modal",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        PlaygroundCreator?.createSwitchElement({
            displayName: "disablePortal",
            elementName: "disablePortal",
            value: true
        }),
        PlaygroundCreator?.createSwitchElement({
            displayName: "open",
            elementName: "open"
        }),
    ],
    children: [
        {
            id: generateId(),
            elementName: "children",
            element: "string",
            category: Category.PRIMITIVE,
            value: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
        }
    ]
});

export default Modal;
