import { fromJS } from "immutable";

import { PaperElevation } from "@/hwiui/widgets/paper";
import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

const Paper: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Paper",
    elementName: "paper",
    element: "Paper",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        PlaygroundCreator?.createInputElement({
            displayName: "Body",
            elementName: "children",
            value: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"
        }),
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "elevation",
                elementName: "elevation",
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
            Object.entries(PaperElevation)
        ),
    ],
    children: []
});

export default Paper;
