import { memo } from "react";
import { Alert } from "@mui/material";

import { displayName } from "@/packages/hwiui";
import {
    PlaygroundNodeCategory,
    PlaygroundNodeUtils
} from "../../shared";
import Fragment from "./propInputs/fragment";
import { PropInputProps } from "./types";

function mapProps(
    node: PropInputProps["node"],
    onNodeChange: PropInputProps["onNodeChange"],
    componentMapping?: PropInputProps["componentMapping"]
) {
    const additionalProps = PlaygroundNodeUtils.getAdditionalAttributes(node).toJS()
        .reduce((properties, nodeAttribute) => {
            const currentNodeAttribute = nodeAttribute;
            if("label" in currentNodeAttribute && "value" in currentNodeAttribute) {
                return ({
                    ...properties,
                    [String(currentNodeAttribute.label)]: currentNodeAttribute.value ?? null
                })
            }
            return properties;
        }, {});
    if("nodeCategory" in node
        && [PlaygroundNodeCategory.PLAYGROUND_COMPONENT, PlaygroundNodeCategory.PLAYGROUND_COMPONENT_PROPS].includes(node.get("nodeCategory"))) {
        return {node, onNodeChange, componentMapping, ...additionalProps};
    }
    return additionalProps;
}

const ComponentPropsNodeRenderer = ({
    node,
    onNodeChange,
    componentMapping
}: PropInputProps) => {
    if(!node) {
        return null;
    }
    const Component = PlaygroundNodeUtils.getComponent(node, componentMapping);
    if(Component) {
        const nodeChildren = PlaygroundNodeUtils.getChildren(node);
        const props = mapProps(node, onNodeChange, componentMapping);
        if(!nodeChildren?.size) {
            return (<Component {...props} />);
        }
        if(nodeChildren.size) {
            return (
                <Component {...props}>
                    <Fragment
                        componentMapping={componentMapping}
                        node={node}
                        onNodeChange={onNodeChange}
                    />
                </Component>
            );
        }
    }
    return (
        <Alert severity="warning">{`Unsupported node type: '${String(node.get("elementName", "N/A"))}'.`}</Alert>
    );
};

export default memo(displayName()(ComponentPropsNodeRenderer));
