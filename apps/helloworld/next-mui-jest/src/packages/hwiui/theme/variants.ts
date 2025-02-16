import { createTheme } from "@mui/material";

import ThemeMode from "./themeMode";

export const BlackNWhite = createTheme({
    palette: {
        mode: ThemeMode.DARK
    }
});

export const WhiteNBlack = createTheme({
    palette: {
        mode: ThemeMode.LIGHT
    }
});
