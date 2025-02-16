import { ElementType } from "react";
import { List as ImmutableList, Record as ImmutableRecord } from "immutable";

import { AbstractPlaygroundAttributes, PlaygroundAttributesRecord, PlaygroundAttributesRecordList } from "./playgroundAttributes";
import { PlaygroundNodeCategory, PlaygroundNodeType } from "./playgroundType";
import { PresentationProps } from "./types";

class PlaygroundNodeUtils {

    getAdditionalAttributes(node: PlaygroundAttributesRecord | null): PlaygroundAttributesRecordList {
        return node?.get("additionalAttributes", ImmutableList()) ?? ImmutableList();
    }

    getChildren(node: PlaygroundAttributesRecord | null): PlaygroundAttributesRecordList {
        return node?.get("children", ImmutableList()) ?? ImmutableList();
    }

    getComponent(
        node: PresentationProps["node"],
        componentMapping?: PresentationProps["componentMapping"]
    ): ElementType | null {
        if(!node.get("nodeType", null)) {
            return null;
        }
        if(node.get("nodeType", null) === PlaygroundNodeType.ELEMENT) {
            return node.get("elementName", null) as ElementType | null;
        }
        return componentMapping?.[node.get("elementName", "") as string] ?? null;
    }

    isRecord(value?: unknown): value is PlaygroundAttributesRecord {
        return Boolean(value) && value instanceof ImmutableRecord<AbstractPlaygroundAttributes>({
            nodeCategory: PlaygroundNodeCategory.DATA_COMPONENT,
            elementName: "",
            id: "",
            nodeType: PlaygroundNodeType.ELEMENT
        });
    }

}

export default new PlaygroundNodeUtils();
