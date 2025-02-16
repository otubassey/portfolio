import { ChangeEvent, Children, cloneElement, isValidElement, memo, useCallback } from "react";

import { displayName } from "@/hwiui/decorator";

import update from "../update";
import { Props } from "../../common";
import { ClassesUtils } from "@/hwiutils";

const Input = ({children, node, onNodeChange}: Props) => {
    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        onNodeChange(
            node!
                .set("checked", event.target.checked)
                .set("value", event.target.value)
        );
    }, [node, onNodeChange]);
    if(!node) {
        return "Invalid Input Node";
    }

    return (
        <div className="my-2">
            <input
                id={node.get("id")}
                checked={node.get("checked") ?? false}
                className={ClassesUtils.merge(
                    node.get("className"),
                    [node.get("type") === "radio" && "cursor-pointer"]
                )}
                name={node.get("name")}
                onChange={handleInputChange}
                placeholder={node.get("placeholder")}
                type={node.get("type")}
                value={node.get("value")}
            />
        </div>
    );
};

export default memo(displayName()(Input));
