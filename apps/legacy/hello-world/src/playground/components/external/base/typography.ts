import { fromJS } from "immutable";

import { TypographyColor, TypographyVariant } from "@/hwiui/widgets/typography";
import generateId from "@/hwiutils/generateId/generateId";

import {Category, ImmutablePlaygroundAttributes, PlaygroundCreator} from "../../common";

// TODO: reset is not clearing color, maybe because there's no default value set here?
const Typography: ImmutablePlaygroundAttributes = fromJS({
    id: generateId(),
    isExaminedNode: true,
    displayName: "Typography",
    elementName: "typography",
    element: "Typography",
    category: Category.HWIUI_COMPONENT,
    additionalAttributes: [
        PlaygroundCreator?.createInputElement({
            displayName: "children",
            elementName: "children",
            value: "Some Text"
        }),
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "color",
                elementName: "color"
            },
            Object.entries(TypographyColor)
        ),
        PlaygroundCreator?.createInputElement({
            displayName: "component",
            elementName: "component",
            value: "p"
        }),
        PlaygroundCreator?.createSwitchElement({
            displayName: "gutterBottom",
            elementName: "gutterBottom"
        }),
        PlaygroundCreator?.createSelectElement(
            {
                displayName: "variant",
                elementName: "variant",
                value: TypographyVariant.BODY
            },
            Object.entries(TypographyVariant)
        )
    ],
    children: [],
    value: false
});

export default Typography;
