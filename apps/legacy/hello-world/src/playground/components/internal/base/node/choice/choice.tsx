import { memo, useCallback } from "react";

import { displayName } from "@/hwiui/decorator";
import { Typography } from "@/hwiui/widgets/typography";
import { ImmutablePlaygroundAttributes } from "@/playground/components/common";

import { NodeRenderer, Props } from "../../../common";

const Choice = ({node, onNodeChange}: Props) => {
    const handleNodeChange = useCallback((modifiedChildNode: ImmutablePlaygroundAttributes) => {
        const modifiedNode = node!
            .set("value", modifiedChildNode.get("value"))
            .set("children", node!.get("children").map((child: ImmutablePlaygroundAttributes) => (
                child.get("id") === modifiedChildNode.get("id")
                    ? modifiedChildNode
                    : child.set("checked", false)
            )));
        onNodeChange(modifiedNode);
    }, [node, onNodeChange]);
    if(!node) {
        return <Typography>Invalid Choice Node</Typography>;
    }
    return (
        <fieldset>
            <Typography component="legend">{`Select a ${node.get("displayName")}:`}</Typography>
            {node.get("children").map((child: ImmutablePlaygroundAttributes) => (
                <NodeRenderer key={child.get("id")} node={child} onNodeChange={handleNodeChange} />
            ))}
        </fieldset>
    );
};

export default memo(displayName()(Choice));
