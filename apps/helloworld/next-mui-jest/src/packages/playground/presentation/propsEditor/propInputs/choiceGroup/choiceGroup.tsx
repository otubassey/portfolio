import { ForwardedRef, forwardRef, memo, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { List as ImmutableList } from "immutable";
import { Alert, FormControl, FormGroup} from "@mui/material";

import { displayName } from "@/packages/hwiui";
import { ChoicePlaygroundAttributesRecord, PlaygroundAttributesRecord } from "@/packages/playground";

import { PropInputProps } from "../../types";
import { Choice } from "../choice";
import ChoiceGroupContext, { ChoiceGroupContextValue } from "./choiceGroupContext";

function isChoiceChecked(node: PlaygroundAttributesRecord, choiceNode: PlaygroundAttributesRecord): boolean {
    if(node.get("multiple", false)) {
        return ImmutableList.isList(node.get("value", null))
            && (node.get("value") as ImmutableList<unknown>)
                .some((value: unknown) => value === choiceNode.get("value", null));
    }
    return node.get("value", null) === choiceNode.get("value", null);
}

type Props = Omit<PropInputProps, "node"> & {
    node: ChoicePlaygroundAttributesRecord;
};

const ChoiceGroup = ({
    node,
    onNodeChange,
    componentMapping
}: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const handleMultiChoiceChange = useCallback((previousChildNode: PlaygroundAttributesRecord, nextChildNode: PlaygroundAttributesRecord) => {
        let updatedValues: ImmutableList<unknown> = ImmutableList.isList(node.get("value")) ? node.get("value") : ImmutableList();

        const isNextChildNodeChecked = nextChildNode.get("checked", false);
        // Check if node is like a Select Component that could have multiple values
        const canHaveMultipleValues = previousChildNode.get("multiple", false);
        if(isNextChildNodeChecked && updatedValues.size && canHaveMultipleValues) {
            // for node changes from components like a Select that could have multiple values,
            // replace the previous value instance with the current value
            updatedValues = updatedValues.map(value => (
                value === previousChildNode.get("value")
                    ? nextChildNode.get("value")
                    : value
            ));
        }
        const alreadyExists = isNextChildNodeChecked && updatedValues.some(value => (value === previousChildNode.get("value")));
        if(isNextChildNodeChecked && (updatedValues.size === 0 || (!canHaveMultipleValues && !alreadyExists))) {
            updatedValues = nextChildNode.get("value", null)
                ? updatedValues.push(nextChildNode.get("value"))
                : updatedValues;
        }
        if(!isNextChildNodeChecked || (updatedValues.size && !canHaveMultipleValues && alreadyExists)) {
            updatedValues = updatedValues.filter(value => (value !== previousChildNode.get("value")));
        }

        const updatedChildren = node?.get("children")?.map((childNode: PlaygroundAttributesRecord) => (
            childNode.get("id") === nextChildNode.get("id")
                ? nextChildNode
                : childNode
        ));

        const modifiedNode = node!
            .set("value", updatedValues)
            .set("children", updatedChildren);

        onNodeChange(modifiedNode);
    }, [node, onNodeChange]);
    const handleSingleChoiceChange = useCallback((modifiedChildNode: PlaygroundAttributesRecord) => {
        const updatedValue = modifiedChildNode.get("value", null);
        
        const updatedChildren = node?.get("children")?.map((child: PlaygroundAttributesRecord) => {
            if(child.get("id") === modifiedChildNode.get("id")) {
                return modifiedChildNode;
            }
            // uncheck the other choice options
            return child.set("checked", false);
        });

        const modifiedNode = node!
            .set("value", updatedValue)
            .set("children", updatedChildren);

        onNodeChange(modifiedNode);
    }, [node, onNodeChange]);
    const handleChoiceChange = useCallback((previousChildNode: PlaygroundAttributesRecord, nextChildNode: PlaygroundAttributesRecord) => {
        if(node.get("multiple")) {
            handleMultiChoiceChange(previousChildNode, nextChildNode);
        } else {
            handleSingleChoiceChange(nextChildNode);
        }
    }, [handleMultiChoiceChange, handleSingleChoiceChange, node]);
    const contextValue = useMemo<ChoiceGroupContextValue>(() =>({
        name: node.get("name") || node.get("label"),
        onNodeChange(previousNode: PlaygroundAttributesRecord, nextNode: PlaygroundAttributesRecord) {
            handleChoiceChange(previousNode, nextNode);
        },
        value: node.get("value")
    }), [handleChoiceChange, node]);
    if(!node) {
        return <Alert severity="warning">Invalid ChoiceGroup Node</Alert>;
    }
    return (
        <ChoiceGroupContext.Provider value={contextValue}>
            <FormControl ref={ref}>
                <FormGroup
                    aria-label={node.get("label")}
                    row={node.get("row")}>
                    {node.get("children")?.map((child, index) => (
                        <Choice
                            key={child.get("id", index)}
                            checked={isChoiceChecked(node, child)}
                            componentMapping={componentMapping}
                            multiple={node.get("multiple", false)}
                            node={child}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </ChoiceGroupContext.Provider>
    );
};

ChoiceGroup.propTypes = {
    node: PropTypes.object,
    onNodeChange: PropTypes.func,
    componentMapping: PropTypes.object
};

export default memo(forwardRef<HTMLDivElement, Props>(displayName()(ChoiceGroup)));
