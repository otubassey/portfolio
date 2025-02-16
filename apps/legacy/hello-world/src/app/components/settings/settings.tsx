"use client";

import { ReactEventHandler, SetStateAction, SyntheticEvent, memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Configuration, ThemeConfiguration } from "@/hwiui/context/configuration";
import { displayName } from "@/hwiui/decorator";
import { IconButton } from "@/hwiui/widgets/button";
import { Dialog, DialogActions, DialogTitle } from "@/hwiui/widgets/dialog";
import { IconName } from "@/hwiui/widgets/icon";
import { List, ListItemButton, ListItemText } from "@/hwiui/widgets/list";
import { Title } from "@/hwiui/widgets/title";

import ThemeEditor from "./editors/themeEditor";

type Props = {
    configuration: Configuration;
    onClose?: ReactEventHandler;
    onConfigurationChange: SetStateAction<Configuration>
    open?: boolean;
};

Settings.propTypes = {
    configuration: PropTypes.object,
    onClose: PropTypes.func,
    onConfigurationChange: PropTypes.func.isRequired,
    open: PropTypes.bool
};

function Settings({configuration, onClose, onConfigurationChange, open = false}: Props) {
    const [modifiedConfiguration, setModifiedConfiguration] = useState<Configuration>(configuration);
    const handleApplySettings = useCallback((event: SyntheticEvent<HTMLButtonElement, Event>) => {
        onConfigurationChange((previousConfiguration: Configuration) => ({
            ...previousConfiguration,
            ...modifiedConfiguration
        }));
        onClose?.(event);
    }, [onConfigurationChange, modifiedConfiguration, onClose]);
    const handleCancelSettings = useCallback((event: SyntheticEvent<HTMLButtonElement, Event>) => {
        setModifiedConfiguration(configuration);
        onClose?.(event);
    }, [configuration, onClose]);
    const handleThemeChanged = useCallback((modifiedThemeConfiguration: ThemeConfiguration) => {
        setModifiedConfiguration((previousConfiguration: Configuration) => ({
            ...previousConfiguration,
            theme: modifiedThemeConfiguration
        }));
    }, []);
    useEffect(() => {
        setModifiedConfiguration(configuration);
    }, [configuration]);
    return (
        <>
            {/* Mobile Screen */}
            <div className={`${open ? "block" : "hidden"} sm:hidden h-screen`}>
                <List component="ol" className="flex justify-between">
                    <ListItemText classes={{root: "content-center"}} aria-label="Settings">
                        <Title>Settings</Title>
                    </ListItemText>
                    <ListItemButton onClick={handleCancelSettings}>
                        <IconButton icon={IconName.CLOSE} />
                    </ListItemButton>
                </List>
                <ThemeEditor configuration={modifiedConfiguration?.theme} onChange={handleThemeChanged} />
                <div className="flex items-center justify-end w-full mt-6 gap-5">
                    <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bg-gray-100 transition duration-15 ease-in-out hover:bg-secondaryDark bg-secondaryMain text-secondaryContrastText rounded px-8 py-2 text-sm"
                        onClick={handleCancelSettings}>
                        Cancel
                    </button>
                    <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-primaryMain bg-primaryLight rounded text-white px-8 py-2 text-sm"
                        onClick={handleApplySettings}>
                        Apply
                    </button>
                </div>
            </div>

            {/* Non-Mobile Screen */}
            <Dialog open={open} className={`hidden sm:${open ? "grid" : "hidden"}`}>
                <DialogTitle>Settings</DialogTitle>
                    <ThemeEditor configuration={modifiedConfiguration?.theme} onChange={handleThemeChanged} />
                <DialogActions>
                    <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bg-gray-100 transition duration-15 ease-in-out hover:bg-secondaryDark bg-secondaryMain text-secondaryContrastText rounded px-8 py-2 text-sm"
                        onClick={handleCancelSettings}>
                        Cancel
                    </button>
                    <button
                        className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-primaryMain bg-primaryLight rounded text-white px-8 py-2 text-sm"
                        onClick={handleApplySettings}>
                        Apply
                    </button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default memo(displayName()(Settings));
