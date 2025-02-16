import { ReactNode, memo, useCallback, useEffect, useState } from "react";
import Immutable from "immutable";

import { WindowUtils } from "@/hwiutils";

import { ThemeMode } from "./constants";
import { ThemeContext } from "./context";
import { ThemeCache, ThemeUtils } from "./themeUtils";
import { OnThemeChangeEvent, ThemeContextParams, ThemeType } from "./types";
import { displayName, namedMemo } from "../decorator";

type ThemeProviderClientComponentProps = {
    children: ReactNode;
    theme: ThemeType;
    onChange: ThemeContextParams["onChange"];
    onReset: ThemeContextParams["onReset"];
};

const ThemeProviderClientComponent = ({
    children,
    theme,
    onChange,
    onReset
}: ThemeProviderClientComponentProps) => {
    useEffect(() => {
        // this should dispatch to update theme's current based on value from local storage
        const savedCurrentTheme = ThemeCache.get();
        if(savedCurrentTheme) {
            onChange(previousTheme => {
                if(previousTheme && !Immutable.is(savedCurrentTheme, previousTheme.get("current"))) {
                    return ThemeUtils.update(previousTheme, previousTheme.set("current", savedCurrentTheme));
                }
                return previousTheme;
            });
        }
    }, []);

    useEffect(() => {
        // Set data-theme with updated theme name
        const themeTweaker = WindowUtils.Tweaker.theme;
        if(!themeTweaker.isSame(theme.getIn(["current", "name"]))) {
            WindowUtils.Tweaker.theme.onChange(theme.getIn(["current", "name"]));
        }
    }, [theme]);

    useEffect(() => {
        // this should update local storage with a change to theme
        const savedCurrentTheme = ThemeCache.get();
        if(theme.getIn(["current", "remember"]) && (!savedCurrentTheme || !Immutable.is(theme.get("current"), savedCurrentTheme))) {
            ThemeCache.set(JSON.stringify(theme.get("current").toJS()));
        }
        if(!theme.getIn(["current", "remember"]) && savedCurrentTheme && !Immutable.is(theme.get("current"), savedCurrentTheme)) {
            ThemeCache.remove();
        }
    }, [theme]);

    useEffect(() => {
        // this should listen to changes to the media color scheme and apply that to theme's current
        const handleChange = () => {
            onChange(previousTheme => (
                previousTheme
                    ? ThemeUtils.update(previousTheme, previousTheme.setIn(["current", "mode"], ThemeMode.SYSTEM))
                    : ThemeUtils.getDefault().setIn(["current", "mode"], ThemeMode.SYSTEM)
            ));
        };
        
        const darkPrefersColorSchemeMediaQueryList: MediaQueryList | null = ThemeUtils.getMediaColorScheme();
        if(darkPrefersColorSchemeMediaQueryList) {
            const isColorSchemeDark = theme.getIn(["current", "isDarkColoredScheme"]) || false; 
            const isThemeModeSystem = theme.getIn(["current", "mode"]) === ThemeMode.SYSTEM;
            const isSystemColorSchemeDark = darkPrefersColorSchemeMediaQueryList.matches;
            if(isThemeModeSystem && isColorSchemeDark !== isSystemColorSchemeDark) {
                handleChange();
            }

            darkPrefersColorSchemeMediaQueryList.addEventListener("change", handleChange, false);
        }
        return () => {
            if(darkPrefersColorSchemeMediaQueryList) {
                darkPrefersColorSchemeMediaQueryList.removeEventListener("change", handleChange, false);
            }
        };
    }, []);

    return (
        <ThemeContext.Provider value={{theme, onChange, onReset}}>
            {children}
        </ThemeContext.Provider>
    );
}

const ThemeProviderClient = namedMemo(displayName()(ThemeProviderClientComponent));

function useUpdateTheme(): ThemeContextParams {
    const [theme, setTheme] = useState<ThemeType | null>(null);
    const onChange = useCallback((updatedThemeEvent: OnThemeChangeEvent) => {
        setTheme(previousTheme => {
            const updatedTheme = typeof updatedThemeEvent === "function"
                ? updatedThemeEvent(previousTheme)
                : updatedThemeEvent;
            return updatedTheme ? ThemeUtils.update(previousTheme, updatedTheme) : previousTheme;
        });
    }, []);
    const onReset = useCallback(() => {
        setTheme(ThemeUtils.getDefault());
    }, []);
    useEffect(() => {
        setTheme(ThemeUtils.getDefault());
    }, []);
    return {theme, onChange, onReset};
}

type ThemeProviderProps = {
    children: ReactNode;
};

const ThemeProvider = ({children}: ThemeProviderProps) => {
    const {theme, onChange, onReset} = useUpdateTheme();
    if(!theme || !children) {
        return children;
    }
    return (
        <ThemeProviderClient theme={theme} onChange={onChange} onReset={onReset}>
            {children}
        </ThemeProviderClient>
    );
}

export default memo(displayName()(ThemeProvider));
