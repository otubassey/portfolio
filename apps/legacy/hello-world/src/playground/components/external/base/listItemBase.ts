import Immutable from "immutable";

import generateId from "@/hwiutils/generateId/generateId";

import {Category} from "../../common";
import PlaygroundCreator from "../../common/playgroundCreator";

const ListItemBase = PlaygroundCreator.createElement({
    id: generateId(),
    category: Category.ELEMENT,
    displayName: "List Item Base",
    element: "ul",
    children: Immutable.fromJS(["listItemBase 1", "listItemBase 2"].map(value => ({
        id: generateId(),
        className: "inline-flex items-center justify-between w-full",
        displayName: value,
        element: "ListItemBase",
        category: Category.HWIUI_COMPONENT,
        isExaminedNode: true,
        propNames: Immutable.List(["className"]),
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
            })
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

export default ListItemBase;

