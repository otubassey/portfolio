import {List as ImmutableList} from "immutable";
import PropTypes from "prop-types";

import { getDisplayName, namedMemo } from "@/hwiui/decorator";
import { Typography } from "@/hwiui/widgets/typography";
import { Category, ImmutablePlaygroundAttributes, PlaygroundUtils } from "@/playground/components/common";
import { OnNodeChange, Props } from "./types";

function mapProps(node: ImmutablePlaygroundAttributes, onNodeChange: OnNodeChange) {
    const props = PlaygroundUtils.getProps(node);
    const additionalProps = PlaygroundUtils.getAdditionalAttributes(node).toJS()
        .reduce((properties, nodeAttribute) => ({
            ...properties,
            [nodeAttribute.elementName]: nodeAttribute.value ?? null
        }), props);
    if(node.get("category") === Category.PLAYGROUND_COMPONENT) {
        return {node, onNodeChange, ...additionalProps};
    }
    return additionalProps;
}

const NodeRenderer = ({node, onNodeChange}: Props) => {
    if(!node) {
        return null;
    }
    if(node.get("category") === Category.PRIMITIVE) {
        return (
            <Typography>{node.get("value", null)}</Typography>
        );
    }
    const Component = PlaygroundUtils.getComponent(node);
    if(Component) {
        const nodeChildren = node.get("children") ?? ImmutableList<ImmutablePlaygroundAttributes>();
        const hasChildren = nodeChildren.size > 0;
        const props = mapProps(node, onNodeChange);
        if(!hasChildren) {
            return (<Component {...props} />);
        }
        if(hasChildren) {
            return (
                <Component {...props}>
                    {
                        nodeChildren.map((childNode: ImmutablePlaygroundAttributes) => (
                            <NodeRenderer
                                key={childNode.get("id")}
                                node={childNode}
                                onNodeChange={onNodeChange}
                            />
                        ))
                    }
                </Component>
            );
        }
    }
    return (
        <Typography>{`Unsupported node type ${node.get("element")}.`}</Typography>
    );
};

NodeRenderer.displayName = getDisplayName(NodeRenderer);

NodeRenderer.propTypes = {
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};

export default namedMemo(NodeRenderer);
