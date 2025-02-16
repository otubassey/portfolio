import { memo } from "react";
import Immutable from "immutable";
import PropTypes from "prop-types";

import { getDisplayName } from "@/hwiui/decorator";
import { Typography } from "@/hwiui/widgets/typography";
import { Category, ImmutablePlaygroundAttributes, PlaygroundUtils } from "@/playground/components/common";

type Props = {
    node: ImmutablePlaygroundAttributes;
};

const DisplayNodeRenderer = ({node}: Props) => {
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
        const nodeChildren = node.get("children") ?? Immutable.List<ImmutablePlaygroundAttributes>();
        const hasChildren = nodeChildren.size > 0;
        const nodeProps = PlaygroundUtils.getProps(node);
        const props = PlaygroundUtils.getAdditionalAttributes(node).toJS()
            .reduce((properties, nodeAttribute) => {
                let value = nodeAttribute.value;
                const isObject = Boolean(value) && typeof value === "object" && !Array.isArray(value);
                const isPlaygroundNode = isObject && [
                    Category.HWIUI_COMPONENT,
                    Category.PLAYGROUND_COMPONENT
                ].includes(value.category);
                if(isPlaygroundNode) {
                    value = <DisplayNodeRenderer node={Immutable.fromJS(value)} />;
                }
                return ({
                    ...properties,
                    [nodeAttribute.elementName]: value ?? null
                });
            }, nodeProps);
        console.log("tagged-DisplayNodeRenderer: vals =", {
            node: node?.toJS?.(),
            nodeProps,
            props,
            nodeChildren: nodeChildren?.toJS()
        });
        if(!hasChildren) {
            return (<Component {...props} />);
        }
        if(hasChildren) {
            return (
                <Component {...props}>
                    {
                        nodeChildren.map((childNode: ImmutablePlaygroundAttributes) => (
                            <DisplayNodeRenderer
                                key={childNode.get("id")}
                                node={childNode}
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

DisplayNodeRenderer.displayName = getDisplayName(DisplayNodeRenderer);

DisplayNodeRenderer.propTypes = {
    node: PropTypes.object
};

export default memo(DisplayNodeRenderer);
