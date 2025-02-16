import { memo, useMemo } from "react";
import { List as ImmutableList } from "immutable";

import { displayName } from "@/packages/hwiui";
import {
    OnPropsGenerator,
    PlaygroundAttributesRecord,
    PlaygroundNodeCategory,
    PlaygroundNodeUtils,
    PresentationProps
} from "../../shared";
import PresentationNodeRenderer from "../presentationNodeRenderer";
import ComponentsByName from "./componentsByName";

function mapValue(
    value: PlaygroundAttributesRecord | unknown,
    componentMapping: PresentationProps["componentMapping"],
    propsGenerator: OnPropsGenerator
): unknown {
    if(PlaygroundNodeUtils.isRecord(value)) {
        const canBeMappedToComponent = [
            PlaygroundNodeCategory.HWIUI_COMPONENT,
            PlaygroundNodeCategory.PLAYGROUND_COMPONENT,
        ].includes(value.get("nodeCategory"));
        if(canBeMappedToComponent) {
            return (
                <PresentationNodeRenderer
                    key={value.get("id")}
                    componentMapping={componentMapping}
                    node={value}
                    propsGenerator={propsGenerator}
                />
            );
        }
        if(PlaygroundNodeCategory.DATA_COMPONENT === value.get("nodeCategory")) {
            return mapValue(value.get("value"), componentMapping, propsGenerator);
        }
        return value;
    }
    if(ImmutableList.isList(value)) {
        return value.map(item => mapValue(item, componentMapping, propsGenerator));
    }
    return value;
}

function mapProps(
    node: PresentationProps["node"],
    componentMapping: PresentationProps["componentMapping"]
): {[key: string]: unknown} {
    return PlaygroundNodeUtils.getAdditionalAttributes(node)
        .reduce((properties, nodeAttribute) => {
            if(nodeAttribute.get("label", "")) {
                return ({
                    ...properties,
                    [String(nodeAttribute.get("label", ""))]: mapValue(
                        nodeAttribute.get("value"),
                        componentMapping, mapProps
                    )
                });
            }
            return properties;
        }, {});
}

const ComponentViewer = ({
    node,
    componentMapping: componentMappingProp
}: PresentationProps) => {
    const componentMapping = useMemo(() => ({
        ...(componentMappingProp ?? {}),
        ...ComponentsByName
    }), [componentMappingProp]);
    return (
        <PresentationNodeRenderer
            componentMapping={componentMapping}
            node={node}
            propsGenerator={mapProps}
        />
    );
};

export default memo(displayName()(ComponentViewer));
