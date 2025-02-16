import { Fragment as ReactFragment, ReactNode, memo } from "react";
import PropTypes from "prop-types";
import { List as ImmutableList } from "immutable";
import { Alert, Typography } from "@mui/material";

import {
    OnPropsGenerator,
    PlaygroundAttributesRecord,
    PlaygroundNodeType,
    PlaygroundNodeUtils,
    PresentationProps
} from "../shared";
import { displayName } from "@/packages/hwiui";

type PresentationNodeRendererProps = PresentationProps & {
    propsGenerator: OnPropsGenerator;
};

const PresentationNodeRenderer = ({
    node,
    componentMapping,
    propsGenerator
}: PresentationNodeRendererProps) => {
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
        const props = propsGenerator(node, componentMapping);
        if(!nodeChildren?.size) {
            const {children: componentChildren, ...otherProps} = props;
            return (
                <Component
                    key={String(node.get("id", ""))}
                    {...otherProps}>
                    {
                        ImmutableList.isList(componentChildren)
                            ? (
                                componentChildren.map((Child, index) => (
                                    <ReactFragment key={index}>{Child as ReactNode}</ReactFragment>
                                ))
                            )
                            : componentChildren
                    }
                </Component>
            );
        }
        if(nodeChildren.size) {
            return (
                <Component key={String(node.get("id", ""))} {...props}>
                    {
                        nodeChildren.map((childNode: PlaygroundAttributesRecord) => (
                            <PresentationNodeRenderer
                                key={String(childNode.get("id", ""))}
                                componentMapping={componentMapping}
                                node={childNode}
                                propsGenerator={propsGenerator}
                            />
                        ))
                    }
                </Component>
            );
        }
    }
    return (
        <Alert severity="warning">{`Unsupported node type: '${String(node.get("elementName", "N/A"))}'.`}</Alert>
    );
};

PresentationNodeRenderer.propTypes = {
    node: PropTypes.object
};

export default memo(displayName()(PresentationNodeRenderer));
