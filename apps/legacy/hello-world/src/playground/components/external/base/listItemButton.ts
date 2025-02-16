import Immutable from "immutable";

import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes} from "../../common";
import PlaygroundCreator from "../../common/playgroundCreator";

const ListItemButton: ImmutablePlaygroundAttributes = Immutable.fromJS({
    id: generateId(),
    category: Category.HWIUI_COMPONENT,
    displayName: "List Item Button",
    element: "List",
    additionalAttributes: [ // TODO: modify the props renderer to be able to display these additional props for modification rather than being hardcoded here
        {
            id: generateId(),
            elementName: "listStylePosition",
            element: "string",
            category: Category.PRIMITIVE,
            value: "outside"
        },
        {
            id: generateId(),
            elementName: "listStyleType",
            element: "string",
            category: Category.PRIMITIVE,
            value: "stretch"
        }
    ],
    children: Immutable.fromJS(["listItemButton 1", "listItemButton 2"].map(value => ({
        id: generateId(),
        displayName: value,
        element: "ListItemButton",
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
            PlaygroundCreator.createSwitchElement({
                displayName: "indent",
                elementName: "indent"
            }),
            PlaygroundCreator?.createSwitchElement({
                displayName: "disabled",
                elementName: "disabled",
                value: false
            }),
            PlaygroundCreator?.createSwitchElement({
                displayName: "selected",
                elementName: "selected",
                value: false
            }),
            PlaygroundCreator?.createInputElement({
                displayName: "children",
                elementName: "children",
                value
            })
        ],
        children: [],
        value: null
    })))
});

export default ListItemButton;
