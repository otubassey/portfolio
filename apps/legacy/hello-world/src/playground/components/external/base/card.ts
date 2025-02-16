import { fromJS } from "immutable";

import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

const Card: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Card",
    elementName: "card",
    element: "Card",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        PlaygroundCreator?.createSwitchElement({
            displayName: "raised",
            elementName: "raised"
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

export default Card;
