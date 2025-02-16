import { ReactEventHandler, memo, useCallback } from "react";
import {List as ImmutableList} from "immutable";
import { Alert, Button, List, ListItem, Typography } from "@mui/material";

import { displayName } from "@/packages/hwiui";
import { PlaygroundAttributesRecord, PlaygroundAttributesRecordList, PresentationProps } from "../../shared";
import ComponentPropsNodeRenderer from "./componentPropsNodeRenderer";

type AttributesEditorProps = {
    attributes: PlaygroundAttributesRecordList | null;
    onChange: (val: PlaygroundAttributesRecordList) => void;
    onReset: ReactEventHandler<HTMLElement>;
    componentMapping: PresentationProps["componentMapping"];
};

const AttributesEditor = ({
    attributes,
    onChange,
    onReset,
    componentMapping
}: AttributesEditorProps) => {
    const handleAttributeNodeChange = useCallback((modifiedAttributesNode: PlaygroundAttributesRecord) => {
        const updatedAttributes: PlaygroundAttributesRecordList = attributes!.map((attribute) => {
            const isEqualId = Boolean(attribute.get("id", ""))
                && Boolean(modifiedAttributesNode.get("id", ""))
                && attribute.get("id", "") === modifiedAttributesNode.get("id", "");
            return isEqualId ? modifiedAttributesNode : attribute;
        }) ?? ImmutableList<PlaygroundAttributesRecord>();
        onChange?.(updatedAttributes);
    }, [attributes, onChange]);
    if(!attributes?.size) {
        return (
            <Alert severity="warning">Configure Attributes for Component Node.</Alert>
        );
    }
    return (
        <List>
            {
                attributes.map((attribute: PlaygroundAttributesRecord, index) => (
                    <ListItem key={String(attribute.get("id", index))} sx={{justifyContent: "space-between"}}>
                        <Typography>{String(attribute.get("label", "N/A"))}</Typography>
                        <ComponentPropsNodeRenderer
                            componentMapping={componentMapping}
                            node={attribute}
                            onNodeChange={handleAttributeNodeChange}
                        />
                    </ListItem>
                ))
            }
            <ListItem>
                <Button fullWidth onClick={onReset} variant="outlined">Reset Props</Button>
            </ListItem>
        </List>
    );
};

export default memo(displayName()(AttributesEditor));
