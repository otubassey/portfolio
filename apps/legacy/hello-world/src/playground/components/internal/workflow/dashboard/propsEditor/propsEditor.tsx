import { ChangeEvent, ReactEventHandler, memo, useCallback, useState } from "react";
import Immutable, {List as ImmutableList} from "immutable";

import { displayName } from "@/hwiui/decorator";
import { Button } from "@/hwiui/widgets/button";
import { List, ListItem } from "@/hwiui/widgets/list";
import { Section } from "@/hwiui/widgets/section";
import { Typography } from "@/hwiui/widgets/typography";

import {FormControlLabel, Select} from "../../../base/regular";
import { NodeRenderer, Props } from "../../../common";
import {ImmutablePlaygroundAttributes, PlaygroundUtils} from "../../../../common";

function UnConfiguredNodeAttributesComponent() {
    return (
        <List>
            <ListItem>
                <Typography>Configure Component Node Attributes</Typography>
            </ListItem>
        </List>
    );
}

const UnConfiguredNodeAttributes = memo(displayName("PropsEditor.")(UnConfiguredNodeAttributesComponent));

type AttributesEditorComponentProps = Props & {
    attributes: ImmutableList<ImmutablePlaygroundAttributes> | null;
    onChange: (val: ImmutableList<ImmutablePlaygroundAttributes>) => void;
    onReset: ReactEventHandler<HTMLElement>
};

function AttributesEditorComponent({attributes, onChange, onReset}: AttributesEditorComponentProps) {
    const handleAttributeNodeChange = useCallback((modifiedAttributesNode: ImmutablePlaygroundAttributes) => {
        const updatedAttributes = attributes!.map((attribute: ImmutablePlaygroundAttributes) => (
            attribute.get("id") === modifiedAttributesNode.get("id")
                ? modifiedAttributesNode
                : attribute
        )) ?? ImmutableList<ImmutablePlaygroundAttributes>();
        onChange?.(updatedAttributes);
    }, [attributes, onChange]);
    if(!attributes?.size) {
        return <UnConfiguredNodeAttributes />;
    }
    return (
        <List>
            {
                attributes.map((attribute: ImmutablePlaygroundAttributes) => (
                    <ListItem
                        key={attribute.get("id")}
                        className="grid w-full border border-red-500"
                        secondaryAction={
                            <NodeRenderer node={attribute} onNodeChange={handleAttributeNodeChange} />
                        }>
                        <Typography className="col-span-1 content-center border border-cyan-500">{attribute.get("displayName")}</Typography>
                    </ListItem>
                ))
            }
            <ListItem>
                <Button className="justify-center" fullWidth onClick={onReset} variant="outlined">Reset Props</Button>
            </ListItem>
        </List>
    );
}

const AttributesEditor = memo(displayName("PropsEditor.")(AttributesEditorComponent));

function getExaminedNodes(node: ImmutablePlaygroundAttributes | null): ImmutableList<ImmutablePlaygroundAttributes> {
    let examinedNodes = Immutable.List<ImmutablePlaygroundAttributes>();
    if(!node) {
        return examinedNodes; 
    }
    if(node.get("isExaminedNode")) {
        return examinedNodes.push(node);
    }
    if(node.get("children")?.size) {
        for(const child of node.get("children")) {
            examinedNodes = examinedNodes.push(...getExaminedNodes(child));
        }
    }
    return examinedNodes;
}

type PropsEditorProps = Props & {
    onReset: ReactEventHandler<HTMLElement>;
};

const PropsEditor = ({
    node,
    onNodeChange,
    onReset
}: PropsEditorProps) => {
    const [selectedChildNodeId, setSelectedChildNodeId] = useState("");
    const title = node?.get("displayName") ? `${node.get("displayName")} Props` : "Props";
    const handleAtrtibutesChange = useCallback((modifiedAttributesNode: ImmutableList<ImmutablePlaygroundAttributes>) => {
        onNodeChange?.(node!.set("additionalAttributes", modifiedAttributesNode));
    }, [node, onNodeChange]);
    const handleChildrenAttributeNodeChangeFactory = useCallback((childNode: ImmutablePlaygroundAttributes) => (modifiedChildAttributesNode: ImmutableList<ImmutablePlaygroundAttributes>) => {
        const updatedChildren = node!.get("children").map((child: ImmutablePlaygroundAttributes) => (
            child.get("id") === childNode.get("id")
                ? childNode.set("additionalAttributes", modifiedChildAttributesNode)
                : child
        )) ?? ImmutableList<ImmutablePlaygroundAttributes>();
        onNodeChange?.(node!.set("children", updatedChildren));
    }, [node, onNodeChange]);
    const handleSelectedChildChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
        console.log("tagged-PropsEditor-handleSelectedChildChange: vals =", {
            event,
            value: event.target.value,
            valueToJS: event.target.value?.toJS?.()
        });
        setSelectedChildNodeId(event.target.value);
    }, []);
    const examinedNodes = getExaminedNodes(node);
    if(examinedNodes.size === 1) {
        return (
            <Section classes={{root: "max-h-[48rem] overflow-y-auto"}} title={title}>
                <AttributesEditor
                    attributes={PlaygroundUtils.getAdditionalAttributes(examinedNodes.get(0))}
                    onChange={handleAtrtibutesChange}
                    onReset={onReset}
                />
            </Section>
        );
    }
    if(examinedNodes.size > 1) {
        return (
            <Section classes={{root: "max-h-[48rem] overflow-y-auto"}} title={title}>
                <FormControlLabel
                    control={
                        <Select
                            displayEmpty
                            emptyLabel="None"
                            onChange={handleSelectedChildChange}
                            title="select item"
                            value={selectedChildNodeId ?? examinedNodes.getIn([0, "id"])}>
                            {
                                examinedNodes.map((childNode: ImmutablePlaygroundAttributes, index: number) => (
                                    <Typography
                                        key={childNode.get("id")}
                                        component="option"
                                        value={childNode.get("id")}>
                                        {index + 1}
                                    </Typography>
                                ))
                            }
                        </Select>
                    }
                    label="Select ListItem by position"
                    labelPlacement="start"
                />
                {
                    examinedNodes
                        .filter((childNode: ImmutablePlaygroundAttributes) => (childNode.get("id") === selectedChildNodeId))
                        .map((childNode: ImmutablePlaygroundAttributes) => {
                            const childNodeAttributes = PlaygroundUtils.getAdditionalAttributes(childNode);
                            return (
                                <AttributesEditor
                                    key={childNode.get("id")}
                                    attributes={childNodeAttributes}
                                    onChange={handleChildrenAttributeNodeChangeFactory(childNode)}
                                    onReset={onReset}
                                />
                            );
                    })
                }
            </Section>
        );
    }
    return (
        <Section title={title}>
            <UnConfiguredNodeAttributes />
        </Section>
    );
};

export default memo(displayName()(PropsEditor));
