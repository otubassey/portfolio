import { ChangeEvent, memo, useCallback } from "react";

import { Typography } from "@/hwiui/widgets/typography";
import { ImmutablePlaygroundAttributes } from "@/playground/components/common";

import {FormControl, Radio} from "../../regular";
import { NodeRenderer, Props } from "../../../common";

const ChoiceItem = ({node, onNodeChange}: Props) => {
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onNodeChange?.(node!.set("checked", event.target.checked));
    }, [node, onNodeChange]);
    const handleChildNodeChange = useCallback((modifiedChildNode: ImmutablePlaygroundAttributes) => {
        const modifiedNode = node!
            .set("checked", true)
            .set("children", node?.get("children").map((child: ImmutablePlaygroundAttributes) => (
                child.get("id") === modifiedChildNode.get("id")
                    ? modifiedChildNode
                    : child
            )))
            .set("value", modifiedChildNode.get("value"));
        onNodeChange?.(modifiedNode);
    }, [node, onNodeChange]);
    if(!node) {
        return <Typography>{`Unsupported node type ${node}.`}</Typography>;
    }
    return (
        <FormControl>
            <Radio
                id={node.get("id")}
                checked={node.get("checked")}
                label={node.get("displayName")}
                name={node.get("elementName")}
                onChange={handleChange}
                value={node.get("value")}
            />
            {
                node?.get("children").map((child: ImmutablePlaygroundAttributes) => (
                    <NodeRenderer key={child.get("id")} node={child} onNodeChange={handleChildNodeChange} />
                ))
            }
        </FormControl>
    );
};

export default memo(ChoiceItem);
