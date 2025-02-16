import { fromJS } from "immutable";

import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

const Tab: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Tab",
    elementName: "tab",
    element: "Tab",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        PlaygroundCreator?.createSwitchElement({
            displayName: "disabled",
            elementName: "disabled"
        }),
        {
            id: generateId(),
            displayName: "Label",
            elementName: "label",
            element: "Input",
            category: Category.PLAYGROUND_COMPONENT,
            value: "Page One"
        },
        PlaygroundCreator?.createSwitchElement({
            displayName: "selected",
            elementName: "selected"
        })
    ],
    children: []
});

export default Tab;
