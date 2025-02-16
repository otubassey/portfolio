"use client";

import { memo, useCallback } from "react";

import { List, ListSubheader, ListItemButton, ListItemText } from "@mui/material";

import { displayName, Section, useGeneratedId } from "@/packages/hwiui";
import { PresentationTitle, PresentationTitleValues } from "../dashboard";

type NavigationSectionProps = {
    activeItem?: PresentationTitleValues;
    onChange?: (value: PresentationTitleValues) => void;
};

const NavigationSection = ({
    activeItem,
    onChange
}: NavigationSectionProps) => {
    const componentId = useGeneratedId();
    const componentNavigationId = `component-navigation-section-${componentId}`;
    const handleListItemClick = useCallback((itemName: PresentationTitleValues) => {
        onChange?.(itemName);
    }, [onChange]);
    return (
        <Section aria-labelledby={componentNavigationId}>
            <List
                sx={{ width: "100%" }}
                component="nav"
                aria-labelledby={componentNavigationId}
                subheader={
                    <ListSubheader component="div" id={componentNavigationId}>
                        Component Navigation
                    </ListSubheader>
                }>
                {
                    Object.values(PresentationTitle).map((itemName) => (
                        <ListItemButton
                            key={itemName}
                            onClick={() => handleListItemClick(itemName)}
                            selected={itemName === activeItem}>
                            <ListItemText primary={itemName} />
                        </ListItemButton>        
                    ))
                }
            </List>
        </Section>
    )
};

export default memo(displayName()(NavigationSection));
