import { memo } from "react";

import { FormControl, FormLabel, ToggleButtonGroup } from "@mui/material";

import { displayName, HwiuiIcon, ThemeMode, ToggleButton, useGeneratedId } from "@/packages/hwiui";
import { ValuesOf, StringUtils } from "@/packages/hwiutils";

const MuiIconNamesByMode = {
    [ThemeMode.DARK]: "darkModeOutlined",
    [ThemeMode.LIGHT]: "lightMode",
    [ThemeMode.SYSTEM]: "settingsBrightness"
} as const;

type ThemeModeSelectorAttributes = {
    onChange?: (val: ValuesOf<typeof ThemeMode>) => void;
    value?: ValuesOf<typeof ThemeMode>;
};

// TODO: style this the buttons here to match a textbutton or create ToggleButton with Button as base
const ThemeModeSelector = ({
    onChange,
    value
}: ThemeModeSelectorAttributes) => {
    const componentId = useGeneratedId();
    return (
        <FormControl fullWidth sx={{gap: 1, p: 2}}>
            <FormLabel id={componentId}>Theme Mode</FormLabel>
            <ToggleButtonGroup
                aria-labelledby={componentId!}
                color="primary"
                exclusive
                fullWidth
                onChange={(_, value) => onChange?.(value as ValuesOf<typeof ThemeMode>)}
                value={value}>
                {
                    Object.values(ThemeMode).map((mode) => {
                        return (
                            <ToggleButton
                                key={mode}
                                aria-label={mode}
                                value={mode}>
                                <HwiuiIcon name={MuiIconNamesByMode[mode]} />
                                {StringUtils.capitalize(mode)}
                            </ToggleButton>
                        );
                    })
                }
            </ToggleButtonGroup>
        </FormControl>
    );
};

export default memo(displayName()(ThemeModeSelector));
