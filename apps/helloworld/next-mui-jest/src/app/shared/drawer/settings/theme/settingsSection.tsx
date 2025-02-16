import { memo } from "react";
import { Divider } from "@mui/material";

import ThemeModeSelector from "./themeModeSelector";
import ThemeList from "./themeList";
import { displayName } from "@/packages/hwiui";

const SettingsSection = () => {
    return (
        <div>
            <ThemeModeSelector value="dark" onChange={() => {}} />
            <Divider />
            <ThemeList />
        </div>
    );
};

export default memo(displayName()(SettingsSection));
