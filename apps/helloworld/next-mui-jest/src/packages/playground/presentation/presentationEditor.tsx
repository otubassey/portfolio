import { ComponentType, memo, useCallback, useEffect, useState } from "react";

import { Collapse, Grid2, IconButton } from "@mui/material";

import { displayName, HwiuiIcon, ToggleButton } from "@/packages/hwiui";
import {ComponentPropsEditor} from "./propsEditor";
import {ComponentViewer} from "./viewer";
import { PlaygroundAttributesRecord } from "../shared";

type PresentationEditorProps = {
    node: PlaygroundAttributesRecord;
    componentMapping?: {[key: string]: ComponentType<any> | null};
    isCodeShown?: boolean;
    toggleIsCodeShown?: (value: boolean) => void;
};

const PresentationEditor = ({
    componentMapping,
    node,
    isCodeShown,
    toggleIsCodeShown
}: PresentationEditorProps) => {
    const [modifiedNode, setModifiedNode] = useState<PlaygroundAttributesRecord>(node);
    const handleReset = useCallback(() => {
        setModifiedNode(node);
    }, [node]);
    const handleToggle = useCallback(() => {
        toggleIsCodeShown?.(!isCodeShown);
    }, [isCodeShown, toggleIsCodeShown]);
    useEffect(() => {
        setModifiedNode(node);
    }, [node]);
    return (
        <Grid2>
            <Grid2 container size={12}>
                <Grid2 size={8}>
                    <ComponentViewer componentMapping={componentMapping} node={modifiedNode} />
                </Grid2>
                <Grid2 size={4}>
                    <ComponentPropsEditor
                        componentMapping={componentMapping}
                        node={modifiedNode}
                        onNodeChange={setModifiedNode}
                        onReset={handleReset}
                    />
                </Grid2>
            </Grid2>
            <Grid2 size={12} sx={{columnGap: 2, display: "flex", justifyContent: "flex-end", paddingY: 1}}>
                <ToggleButton
                    defaultNode="Show Code"
                    onChange={handleToggle}
                    selected={isCodeShown}
                    selectedNode="Hide Code"
                    value="showCode"
                />
                <IconButton aria-label="Edit in StackBlitz">
                    <HwiuiIcon name="boltRounded" />
                </IconButton>
                <IconButton aria-label="Edit in CodeSandbox">
                    <HwiuiIcon name="checkBoxOutlineBlankOutlined" />
                </IconButton>
                <IconButton aria-label="Copy code">
                    <HwiuiIcon name="contentCopy" />
                </IconButton>
                <IconButton aria-label="Reset Changes" onClick={handleReset}>
                    <HwiuiIcon name="restore" />
                </IconButton>
            </Grid2>
            <Grid2 size={12}>
                <Collapse in={isCodeShown} timeout="auto">
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
                    medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
                    occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
                    large plate and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
                    stirring often until thickened and fragrant, about 10 minutes. Add
                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                </Collapse>
            </Grid2>
        </Grid2>
    );
};

export default memo(displayName()(PresentationEditor));
