import { fromJS } from "immutable";

import { SectionHeightSize, SectionScroll } from "@/hwiui/widgets/section/section";
import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

const Section: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Section",
    elementName: "paper",
    element: "Section",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        PlaygroundCreator?.createInputElement({
            displayName: "Body",
            elementName: "children",
            value: [...new Array(50)]
            .map(() => `Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`)
            .join('\n')
        }),
        PlaygroundCreator?.createSwitchElement({
            displayName: "hasStickyHeader",
            elementName: "hasStickyHeader"
        }),
        {
            id: generateId(),
            displayName: "maxHeight",
            elementName: "maxHeight",
            element: "Choice",
            category: Category.PLAYGROUND_COMPONENT,
            children: [
                PlaygroundCreator?.createChoiceItemSelectElement(
                    {
                        checked: true,
                        elementName: "maxHeight",
                        value: SectionHeightSize.SMALL
                    },
                    Object.entries(SectionHeightSize)
                ),
                PlaygroundCreator?.createChoiceItemInputElement({
                    elementName: "maxHeight"
                })
            ],
            value: SectionHeightSize.SMALL
        },
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "scroll",
                elementName: "scroll",
                value: SectionScroll.ALL
            },
            Object.entries(SectionScroll)
        ),
        PlaygroundCreator?.createInputElement({
            displayName: "title",
            elementName: "title",
            value: "Subscribe"
        })
    ],
    children: []
});

export default Section;
