import { ReactEventHandler, memo, useCallback, useMemo, useState } from "react";
import {List as ImmutableList} from "immutable";
import { Alert, FormControlLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

import { displayName, Section } from "@/packages/hwiui";
import { PlaygroundAttributesRecord, PlaygroundAttributesRecordList, PlaygroundNodeUtils } from "../../shared";
import AttributesEditor from "./attributesEditor";
import {PropInputsByName} from "./propInputs";
import { PropInputProps } from "./types";

function getPropsInteractiveNodes(node: PlaygroundAttributesRecord | null): PlaygroundAttributesRecordList {
    let interactiveNodes = ImmutableList<PlaygroundAttributesRecord>();
    if(!node) {
        return interactiveNodes; 
    }
    if(node.get("enablePropsInteraction", false)) {
        return interactiveNodes.push(node);
    }
    const nodeChildren: PlaygroundAttributesRecordList = node.get("children") ?? ImmutableList<PlaygroundAttributesRecord>();
    nodeChildren.forEach((child) => {
        interactiveNodes = interactiveNodes.push(...getPropsInteractiveNodes(child));
    });
    return interactiveNodes;
}

type ComponentPropsEditorProps = PropInputProps & {
    onReset: ReactEventHandler<HTMLElement>;
};

const ComponentPropsEditor = ({
    node,
    onNodeChange,
    onReset,
    componentMapping: componentMappingProp
}: ComponentPropsEditorProps) => {
    const [selectedChildNodeId, setSelectedChildNodeId] = useState("");
    const nodeTitle = node?.get("title", "") ?? "";
    const title = nodeTitle ? `${nodeTitle} Props` : "Props";

    const componentMapping = useMemo(() => ({
        ...(componentMappingProp ?? {}),
        ...PropInputsByName
    }), [componentMappingProp]);

    const handleAttributesChange = useCallback((modifiedAdditionalAttributes: PlaygroundAttributesRecordList) => {
        onNodeChange?.(node!.set("additionalAttributes", modifiedAdditionalAttributes));
    }, [node, onNodeChange]);

    const handleChildrenAttributeNodeChange = useCallback((childNodeId: string, modifiedChildAdditionalAttributes: PlaygroundAttributesRecordList) => {
        const updatedChildren = node!.get("children", ImmutableList<PlaygroundAttributesRecord>())!.map((child) => (
            Boolean(child.get("id", "")) && child.get("id", "") === childNodeId
                ? child.set("additionalAttributes", modifiedChildAdditionalAttributes)
                : child
        )) ?? ImmutableList<PlaygroundAttributesRecord>();
        onNodeChange?.(node!.set("children", updatedChildren));
    }, [node, onNodeChange]);

    const handleSelectedChildChange = useCallback((event: SelectChangeEvent<string>) => {
        setSelectedChildNodeId(event.target.value);
    }, []);

    const interactiveNodes = getPropsInteractiveNodes(node);

    if(interactiveNodes.size === 1) {
        return (
            <Section TypographyProps={{variant: "h5"}} title={title}>
                <AttributesEditor
                    attributes={PlaygroundNodeUtils.getAdditionalAttributes(interactiveNodes.get(0)!)}
                    componentMapping={componentMapping}
                    onChange={handleAttributesChange}
                    onReset={onReset}
                />
            </Section>
        );
    }
    if(interactiveNodes.size > 1) {
        return (
            <Section TypographyProps={{variant: "h5"}} title={title}>
                <FormControlLabel
                    control={
                        <Select
                            displayEmpty
                            onChange={handleSelectedChildChange}
                            title="select item"
                            value={selectedChildNodeId ?? interactiveNodes.getIn([0, "id"])}>
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                interactiveNodes.map((childNode: PlaygroundAttributesRecord, index: number) => (
                                    <MenuItem
                                        key={String(childNode.get("id", ""))}
                                        value={String(childNode.get("id", ""))}>
                                        {`${String(childNode.get("label", "--"))} at position ${index + 1}`}
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    }
                    label={`Select ${String(node.get("title", "--"))} by position`}
                    labelPlacement="start"
                />
                {
                    interactiveNodes
                        .filter((childNode: PlaygroundAttributesRecord) => (childNode.get("id", "") === selectedChildNodeId))
                        .map((childNode: PlaygroundAttributesRecord) => (
                            <AttributesEditor
                                key={String(childNode.get("id", ""))}
                                attributes={PlaygroundNodeUtils.getAdditionalAttributes(childNode)}
                                componentMapping={componentMapping}
                                onChange={(modifiedChildAdditionalAttributes: PlaygroundAttributesRecordList) => (
                                    handleChildrenAttributeNodeChange(String(childNode.get("id", "")), modifiedChildAdditionalAttributes)
                                )}
                                onReset={onReset}
                            />
                        ))
                }
            </Section>
        );
    }
    return (
        <Section TypographyProps={{variant: "h5"}} title={title}>
            <Alert severity="warning">Presentation Node Not Found.</Alert>
        </Section>
    );
};

export default memo(displayName()(ComponentPropsEditor));
