import { memo } from "react";

import { FormControl, FormControlLabel, FormLabel, ListItemButton, Radio, RadioGroup } from "@mui/material";

import { displayName, ThemeMode, useGeneratedId } from "@/packages/hwiui";
import { ValuesOf, StringUtils } from "@/packages/hwiutils";

type ThemeListAttributes = {
    onChange?: (val: ValuesOf<typeof ThemeMode>) => void;
    value?: ValuesOf<typeof ThemeMode>;
};

const ThemeList = ({
    onChange,
    value
}: ThemeListAttributes) => {
    const componentId = useGeneratedId();
    return (
        <FormControl fullWidth sx={{gap: 1, p: 2}}>
            <FormLabel id={componentId}>Themes</FormLabel>
            <RadioGroup
                aria-labelledby={componentId}
                name="theme-toggle"
                value={value}
                onChange={(event) => onChange?.(event.target.value as ValuesOf<typeof ThemeMode>)}>
                {
                    ["monochrome", "theme 2"].map((mode) => (
                        <ListItemButton key={mode}>
                            <FormControlLabel
                                control={<Radio />}
                                label={StringUtils.capitalize(mode)}
                                value={mode}
                            />
                        </ListItemButton>
                    ))
                }
            </RadioGroup>
        </FormControl>
    );
};

export default memo(displayName()(ThemeList));
