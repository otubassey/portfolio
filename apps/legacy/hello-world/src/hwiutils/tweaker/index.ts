import { ThemeName } from "@/hwiui/theme/constants";
import { ValuesOf } from "@/hwiui/widgets/common";

/**
 * TODO: finish working on the pre-* script
 * 
 * "predev": "tsc --excludeFiles '**/node_modules/**' src/hwiutils/tweaker/index.ts --module system --outFile public/myScript.js --watch",
 * 
 * 
 * Needed for:
 * 1. switching between test-portal and app
 * 2. theme switching
 */
(() => {
    const tweakTheme = () => {
        const htmlDocument = document.documentElement;

        const handleThemeChange = (name: ValuesOf<typeof ThemeName>) => {
            console.log("tagged-Tweaker-theme-onChange: val =", {htmlDocument, name});
        };

        try {
            // TODO: for the theme name reference from static util
            const defaultTheme = "dark-classic";
            const savedThemeText = localStorage.getItem("hwi-theme");
            const savedTheme = savedThemeText ? JSON.parse(savedThemeText) : null;
            const themeName = savedTheme?.name || defaultTheme;
            handleThemeChange(themeName);
        } catch (_error) {
            // ignored
        }

        return ({
            onChange: (name: ValuesOf<typeof ThemeName>) => handleThemeChange(name) 
        });
    };

    return ({
        theme: tweakTheme()
    });
})();
