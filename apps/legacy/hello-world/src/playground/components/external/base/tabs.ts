import { fromJS } from "immutable";

import { TabsOrientation } from "@/hwiui/widgets/tabs/tabs";
import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

const TabName = {
    ONE: "page one",
    TWO: "page two",
    THREE: "page three"
} as const;

const Tabs: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Tabs",
    elementName: "tab",
    element: "Tabs",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "orientation",
                elementName: "orientation"
            },
            Object.entries(TabsOrientation)
        ),
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "value",
                elementName: "value",
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
            Object.entries(TabName)
        ),
    ],
    children: Object.values(TabName).map((value, index) => ({
        id: generateId(),
        displayName: "Tab",
        elementName: "tab",
        element: "Tab",
        category: Category.HWIUI_COMPONENT,
        propNames: ["value"],
        additionalAttributes: [
            {
                id: generateId(),
                elementName: "label",
                element: "string",
                category: Category.PRIMITIVE,
                value
            },
            {
                id: generateId(),
                elementName: "selected",
                element: "boolean",
                category: Category.PRIMITIVE,
                value: index === 1
            }
        ],
        value
    }))
});

export default Tabs;
