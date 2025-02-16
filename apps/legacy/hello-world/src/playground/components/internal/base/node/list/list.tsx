import { useCallback } from "react";
import PropTypes from "prop-types";
import Immutable from "immutable";

import { getDisplayName, namedMemo } from "@/hwiui/decorator";
import { List as HWIUIList } from "@/hwiui/widgets/list";
import { ImmutablePlaygroundAttributes } from "@/playground/components/common";

import { NodeRenderer, Props } from "../../../common";

const List = ({node, onNodeChange}: Props) => {
    const handleNodeChange = useCallback((modifiedChildNode: ImmutablePlaygroundAttributes) => {
        const modifiedChildren = node!.get("children").map((child: ImmutablePlaygroundAttributes) => (
            child.get("id") === modifiedChildNode.get("id")
                ? modifiedChildNode
                : child
        ));
        const modifiedNodeValue = (node!.get("value") ?? Immutable.Map())
            .set(modifiedChildNode.get("elementName"), modifiedChildNode.get("value"));
        const modifiedNode = node!
            .set("children", modifiedChildren)
            .set("value", modifiedNodeValue);
        console.log("tagged-List: val =", {
            jsNode: node?.toJS?.(),
            modifiedChildren: modifiedChildren?.toJS?.(),
            modifiedNodeValue: modifiedNodeValue?.toJS?.(),
            modifiedNode: modifiedNode.toJS?.(),
            modifiedChildNode: modifiedChildNode?.toJS?.()
        });
        onNodeChange?.(modifiedNode);
    }, [node, onNodeChange]);
    if(!node) {
        return "Invalid List Node";
    }
    return (
        <HWIUIList className="w-full">
            {node.get("children").map((child: ImmutablePlaygroundAttributes) => (
                <NodeRenderer key={child.get("id")} node={child} onNodeChange={handleNodeChange} />
            ))}
        </HWIUIList>
    );
};

List.displayName = getDisplayName(List);

List.propTypes = {
    children: PropTypes.node,
    node: PropTypes.object,
    onNodeChange: PropTypes.func
};

export default namedMemo(List);
