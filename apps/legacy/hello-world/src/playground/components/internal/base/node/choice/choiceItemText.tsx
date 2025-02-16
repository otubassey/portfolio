import { ChangeEvent, memo, useCallback } from "react";

import { Typography } from "@/hwiui/widgets/typography";

import {Radio} from "../../regular";
import { Props } from "../../../common";

const ChoiceItemText = ({node, onNodeChange}: Props) => {
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onNodeChange?.(node!.set("checked", event.target.checked));
    }, [node, onNodeChange]);
    if(!node) {
        return <Typography>{`Unsupported node type ${node}.`}</Typography>;
    }
    return (
        <Radio
            id={node.get("id")}
            checked={node.get("checked")}
            label={node.get("displayName")}
            name={node.get("elementName")}
            onChange={handleChange}
            value={node.get("value")}
        />
    );
};

export default memo(ChoiceItemText);
