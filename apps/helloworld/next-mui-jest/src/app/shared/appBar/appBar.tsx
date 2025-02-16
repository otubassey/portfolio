"use client";

import { MouseEvent, memo, ReactEventHandler, useCallback } from "react";

import { AppBar as MUIAppBar, Box, Toolbar, Container } from "@mui/material";

import { displayName, HwiuiIcon, ToggleButton, ToggleButtonAttributes } from "@/packages/hwiui";
import { StringUtils } from "@/packages/hwiutils";
import { LinkButton } from "../linkButton";
import PageName from "../pageName";

type MenuToggleButtonComponentAttributes = ToggleButtonAttributes & {
    id?: string | null;
    onChange?: (event: MouseEvent<HTMLElement>, value: boolean) => void;
    onClick?: ReactEventHandler;
    selected: boolean;
};

const MenuToggleButtonComponent = ({
    id,
    onClick,
    onChange,
    selected = false,
    sx,
    ...otherToggleButtonProps
}: MenuToggleButtonComponentAttributes) => {
    const handleToggle = useCallback((event: MouseEvent<HTMLElement>) => {
        onClick?.(event);
        onChange?.(event, !selected);
    }, [onClick, onChange, selected]);
    return (
        <ToggleButton
            {...otherToggleButtonProps}
            aria-controls={id}
            aria-label={selected ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-haspopup="true"
            color="inherit"
            defaultNode={<HwiuiIcon name="menu" sx={{cursor: "pointer"}} />}
            onChange={handleToggle}
            selected={selected}
            selectedNode={<HwiuiIcon name="close" sx={{cursor: "pointer"}} />}
            size="large"
            sx={{
                border: "none",
                borderRadius: "50%",
                color: "inherit",
                ...(sx ?? {})
            }}
        />
    );
};

const MenuToggleButton = memo(displayName("AppBar")(MenuToggleButtonComponent));

type SettingsToggleButtonComponentAttributes = {
    onChange?: (event: MouseEvent<HTMLElement>, value: boolean) => void;
    onClick?: ReactEventHandler;
    selected: boolean;
};

const SettingsToggleButtonComponent = ({
    onClick,
    onChange,
    selected = false
}: SettingsToggleButtonComponentAttributes) => {
    const handleToggle = useCallback((event: MouseEvent<HTMLElement>) => {
        onClick?.(event);
        onChange?.(event, !selected);
    }, [onClick, onChange, selected]);
    return (
        <ToggleButton
            aria-label={selected ? "Close Theme Settings" : "Open Theme Settings"}
            color="inherit"
            defaultNode={<HwiuiIcon name="settings" sx={{cursor: "pointer"}} />}
            onChange={handleToggle}
            selected={selected}
            selectedNode={<HwiuiIcon name="close" sx={{cursor: "pointer"}} />}
            size="large"
            sx={{
                border: "none",
                borderRadius: "50%",
                color: "inherit"
            }}
            value="Theme Settings"
        />
    );
};

const SettingsToggleButton = memo(displayName("AppBar")(SettingsToggleButtonComponent));

type AppBarAttributes = {
    activePathName: string;
    isNavigationMenuSelected: boolean;
    isSettingsSelected: boolean;
    onNavigationMenuChange: (event: MouseEvent<HTMLElement>, value: boolean) => void;
    onSettingsChange: (event: MouseEvent<HTMLElement>, value: boolean) => void;
};

const AppBar = ({
    activePathName,
    isNavigationMenuSelected,
    isSettingsSelected,
    onNavigationMenuChange,
    onSettingsChange
}: AppBarAttributes) => {
    return (
        <MUIAppBar position="static" sx={{padding: 0.5, maxHeight: 88}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{columnGap: 2}}>

                    {/* Mobile Screens */}
                    <MenuToggleButton
                        onChange={onNavigationMenuChange}
                        selected={isNavigationMenuSelected}
                        sx={{display: { xs: "flex", md: "none"}}}
                        value="Navigation Menu"
                    />

                    <Box sx={{ columnGap: 2, display: { xs: "flex"}, flexGrow: 1 }}>
                        <HwiuiIcon name="otuRounded" sx={{ fontSize: "5rem", mr: 1 }} />

                        {/* Non-Mobile Screens */}
                        {Object.values(PageName).map((page) => (
                            <Box
                                key={page}
                                sx={{
                                    display: {
                                        md: "flex",
                                        xs: "none"
                                    },
                                    justifyContent: "flex-start" 
                                }}>
                                <LinkButton
                                    page={page}
                                    selected={StringUtils.includesIgnoreCase(activePathName, page)}
                                />
                            </Box>
                        ))}
                    </Box>

                    <SettingsToggleButton onChange={onSettingsChange} selected={isSettingsSelected} />
                </Toolbar>
            </Container>
        </MUIAppBar>
    )
}

export default memo(displayName()(AppBar));
