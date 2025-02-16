import { memo } from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { fromJS, List as ImmutableList } from "immutable";

import { displayName } from "@/packages/hwiui";
import { ObjectUtils } from "@/packages/hwiutils";
import {
    PlaygroundAttributesRecord,
    PlaygroundDataAttributes,
    PlaygroundNodeCategory,
    PlaygroundNodeType,
    PlaygroundNodeUtils,
    PresentationProps
} from "../../shared";

function mapProps(
    node: PresentationProps["node"],
    componentMapping?: PresentationProps["componentMapping"]
) {
    return PlaygroundNodeUtils.getAdditionalAttributes(node).toJS()
        .reduce((properties, nodeAttribute) => {
            let value = ObjectUtils.hasProperty(nodeAttribute, "value") ? (nodeAttribute as PlaygroundDataAttributes).value : null;
            const isPlaygroundNode = ObjectUtils.isObject(value) && [
                PlaygroundNodeCategory.HTML_COMPONENT,
                PlaygroundNodeCategory.PLAYGROUND_COMPONENT
            ].includes(value.nodeCategory);
            if(isPlaygroundNode) {
                value = (
                    <ComponentViewerNodeRenderer
                        componentMapping={componentMapping}
                        node={fromJS(value)}
                    />
                );
            }
            return ({
                ...properties,
                [(nodeAttribute as PlaygroundDataAttributes).label]: value ?? null
            });
        }, {});
}

const ComponentViewerNodeRenderer = ({
    node,
    componentMapping
}: PresentationProps) => {
    if(!node) {
        return null;
    }
    if(node.get("nodeType", null) === PlaygroundNodeType.TEXT) {
        return (
            <Typography>{String(node.get("value", "--"))}</Typography>
        );
    }
    const Component = PlaygroundNodeUtils.getComponent(node, componentMapping);
    if(Component) {
        const nodeChildren = node.get("children", ImmutableList<PlaygroundAttributesRecord>());
        const props = mapProps(node, componentMapping);
        if(!nodeChildren.size) {
            return (<Component {...props} />);
        }
        if(nodeChildren.size) {
            return (
                <Component {...props}>
                    {
                        nodeChildren.map((childNode: PlaygroundAttributesRecord) => (
                            <ComponentViewerNodeRenderer
                                key={String(childNode.get("id", ""))}
                                componentMapping={componentMapping}
                                node={childNode}
                            />
                        ))
                    }
                </Component>
            );
        }
    }
    return (
        <Typography>{`Unsupported node type ${String(node.get("elementName", "N/A"))}.`}</Typography>
    );
};

ComponentViewerNodeRenderer.propTypes = {
    node: PropTypes.object
};

export default memo(displayName()(ComponentViewerNodeRenderer));
