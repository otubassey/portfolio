import Immutable from "immutable";

import generateId from "@/hwiutils/generateId/generateId";

import {Category} from "../../common";
import PlaygroundCreator from "../../common/playgroundCreator";

const ListItem = PlaygroundCreator.createElement({
    id: generateId(),
    category: Category.ELEMENT,
    displayName: "List Item",
    element: "ul",
    children: Immutable.fromJS(["listItem 1", "listItem 2"].map(value => ({
        id: generateId(),
        displayName: value,
        element: "ListItem",
        category: Category.HWIUI_COMPONENT,
        isExaminedNode: true,
        additionalAttributes: [
            PlaygroundCreator.createSwitchElement({
                displayName: "disableGutters",
                elementName: "disableGutters"
            }),
            PlaygroundCreator.createSwitchElement({
                displayName: "disablePadding",
                elementName: "disablePadding"
            }),
            PlaygroundCreator.createSwitchElement({
                displayName: "divider",
                elementName: "divider"
            }),
            {
                id: generateId(),
                displayName: "secondaryAction",
                elementName: "secondaryAction",
                element: "Choice",
                category: Category.PLAYGROUND_COMPONENT,
                children: [
                    PlaygroundCreator.createChoiceItemTextElement({
                        displayName: "Icon Button",
                        value: {
                            id: generateId(),
                            displayName: "Icon Button",
                            element: "IconButton",
                            category: Category.HWIUI_COMPONENT,
                            additionalAttributes: [
                                {
                                    id: generateId(),
                                    elementName: "color",
                                    element: "string",
                                    category: Category.PRIMITIVE,
                                    value: "primary"
                                }
                            ],
                            value: null
                        }
                    }),
                    PlaygroundCreator.createChoiceItemTextElement({
                        checked: true,
                        displayName: "None",
                        value: ""
                    })
                ],
                value: ""
            }
        ],
        children: [
            {
                id: generateId(),
                element: "string",
                category: Category.PRIMITIVE,
                value
            }
        ],
        value: null
    })))
});

export default ListItem;
