import { fromJS } from "immutable";

import { ListStylePosition, ListStyleType } from "@/hwiui/widgets/list";
import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

const List: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "List",
    elementName: "list",
    element: "List",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        {
            id: generateId(),
            displayName: "component",
            elementName: "component",
            element: "Choice",
            category: Category.PLAYGROUND_COMPONENT,
            additionalAttributes: [],
            children: [
                PlaygroundCreator?.createChoiceItemSelectElement(
                    {
                        checked: true,
                        children: [
                            PlaygroundCreator?.createSelectElement({
                                children: ["menu", "ol", "ul"].map(componentElement => ({
                                    id: generateId(),
                                    displayName: componentElement,
                                    elementName: componentElement,
                                    element: "option",
                                    category: Category.ELEMENT,
                                    propNames: ["value"],
                                    children: [
                                        {
                                            id: generateId(),
                                            element: "string",
                                            category: Category.PRIMITIVE,
                                            value: componentElement
                                        }
                                    ],
                                    value: componentElement
                                })),
                                value: "ul"
                            })
                        ],
                        elementName: "component",
                        value: "ul"
                    }
                ),
                PlaygroundCreator?.createChoiceItemInputElement({ // TODO: security concerns? delay input reaction?
                    elementName: "component",
                    placeholder: "ul",
                    value: "ul"
                })
            ],
            value: "ul"
        },
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "listStylePosition",
                elementName: "listStylePosition",
                value: ListStylePosition.OUTSIDE
            },
            Object.entries(ListStylePosition)
        ),
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "listStyleType",
                elementName: "listStyleType",
                value: ListStyleType.NONE
            },
            Object.entries(ListStyleType)
        )
    ],
    children: ["first", "second", "third", "fourth", "fifth"].map(value => ({
        id: generateId(),
        element: "li",
        elementName: "li",
        category: Category.ELEMENT,
        children: [
            {
                id: generateId(),
                element: "string",
                category: Category.PRIMITIVE,
                value
            }
        ],
        value: null
    }))
});

export default List;
