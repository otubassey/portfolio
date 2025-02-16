import Immutable from "immutable";

import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes} from "../../common";
import PlaygroundCreator from "../../common/playgroundCreator";

const ListItemText: ImmutablePlaygroundAttributes = PlaygroundCreator.createElement({
    id: generateId(),
    category: Category.ELEMENT,
    displayName: "List Item Text",
    element: "ul",
    children: Immutable.fromJS(["listItemText 1", "listItemText 2"].map(value => ({
        id: generateId(),
        displayName: value,
        element: "ListItemText",
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
            PlaygroundCreator?.createInputElement({
                displayName: "primary",
                elementName: "primary",
                value
            }),
            PlaygroundCreator?.createInputElement({
                displayName: "secondary",
                elementName: "secondary",
                value: ""
            }),
        ],
        children: [],
        value: null
    })))
});

export default ListItemText;
