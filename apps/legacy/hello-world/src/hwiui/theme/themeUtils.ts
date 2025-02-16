import Immutable from "immutable";

import { WindowUtils } from "@/hwiutils";

import { ColorScheme, CurrentThemeRecord, ThemeRecord, ThemeMode, ThemeName, LightThemes, DarkThemes } from "./constants";
import { ThemeCurrentType, ThemeType } from "./types";
import { ValuesOf } from "../widgets/common";

export class ThemeCache {
    static LOCAL_STORAGE_KEY = "hwi-theme";

    static get() {
        const value = WindowUtils.LocalStorage.getParsedItem(this.LOCAL_STORAGE_KEY);
        return value ? Immutable.Map(value) : value;
    }

    static remove() {
        WindowUtils.LocalStorage.removeItem(this.LOCAL_STORAGE_KEY);
    }

    static set(value: string) {
        WindowUtils.LocalStorage.setItem(this.LOCAL_STORAGE_KEY, value);
    }
}

export class ThemeUtils {
    static #NAMES_BY_COLOR_SCHEME = Immutable.fromJS({
        light: LightThemes,
        dark: DarkThemes
    });

    static #MODES = Immutable.List(Object.values(ThemeMode));
    
    static getDefault(): ThemeType {
        const savedCurrentTheme = ThemeCache.get();
        const isSystemThemeDarkModeOrNull = this.#isSystemColorSchemeDarkOrNull();
        const savedMode = savedCurrentTheme?.getIn(["current", "mode"]);
        const systemMode = isSystemThemeDarkModeOrNull === null ? null : ThemeMode.SYSTEM;
        const mode = savedMode ?? systemMode ?? ThemeMode.SYSTEM;
        const colorScheme: ValuesOf<typeof ColorScheme> = mode === ThemeMode.SYSTEM
            ? this.#mapColorScheme(isSystemThemeDarkModeOrNull ?? true)
            : this.#mapColorScheme(mode === ColorScheme.DARK);
        return this.#mapValue(this.#mapCurrent(mode, this.#mapDefaultThemeName(colorScheme === ColorScheme.DARK), colorScheme === ColorScheme.DARK));
    }

    static getMediaColorScheme(): MediaQueryList | null {
        if(WindowUtils.isWindowDefined()) {
            return window.matchMedia("(prefers-color-scheme: dark)");
        }
        return null;
    }

    static getNamesByColorScheme(isDarkColoredScheme: boolean = true) {
        return this.#NAMES_BY_COLOR_SCHEME.get(this.#mapColorScheme(isDarkColoredScheme));
    }

    static update(target: ThemeType | null, source: ThemeType): ThemeType {
        // With a system mode, it could either be light or dark based on the system settings and changes
        // and as such, current needs to be re-calculated as with a change in mode.
        const requiresCurrentReCalculation = source.getIn(["current", "mode"]) === ThemeMode.SYSTEM
            || (Boolean(target) && target!.getIn(["current", "mode"]) !== source.getIn(["current", "mode"]));
        if(!requiresCurrentReCalculation) {
            return source;
        }
        const currentMode = source.getIn(["current", "mode"]) ?? ThemeMode.SYSTEM;
        let isColorSchemeDark = currentMode === ThemeMode.DARK;
        if(currentMode === ThemeMode.SYSTEM) {
            const isSystemThemeDarkModeOrNull = this.#isSystemColorSchemeDarkOrNull();
            isColorSchemeDark = isSystemThemeDarkModeOrNull === null ? true : isSystemThemeDarkModeOrNull;
        }
        const themeName = this.#mapThemeName(source, isColorSchemeDark);
        return this.#mapValue(this.#mapCurrent(currentMode, themeName, isColorSchemeDark, source.getIn(["current", "remember"])));
    }

    static #isSystemColorSchemeDarkOrNull(defaultValue?: boolean | null): boolean | null {
        const darkPrefersColorSchemeMediaQueryList: MediaQueryList | null = this.getMediaColorScheme();
        if(!darkPrefersColorSchemeMediaQueryList) {
            return defaultValue ?? null;
        }
        return darkPrefersColorSchemeMediaQueryList.matches;
    }

    static #mapColorScheme(isDark: boolean) {
        return isDark ? ColorScheme.DARK : ColorScheme.LIGHT;
    }

    static #mapCurrent(
        mode: ValuesOf<typeof ThemeMode> = ThemeMode.SYSTEM,
        name: ValuesOf<typeof ThemeName> = ThemeName.BLACK_N_WHITE,
        isDarkColoredScheme: boolean = false,
        remember: boolean = false
    ): ThemeCurrentType {
        return new CurrentThemeRecord({
            mode,
            name,
            isDarkColoredScheme,
            remember
        });
    }

    static #mapDefaultThemeName(isColorSchemeDark: boolean): ValuesOf<typeof ThemeName> {
        return isColorSchemeDark ? ThemeName.BLACK_N_WHITE : ThemeName.WHITE_N_BLACK;
    }

    static #mapThemeName(source: ThemeType, isColorSchemeDark: boolean): ValuesOf<typeof ThemeName> {
        const colorScheme = this.#mapColorScheme(isColorSchemeDark);
        const names = source.getIn(["namesByColorScheme", colorScheme]) ?? source.getIn(["namesByColorScheme", ColorScheme.DARK]);
        const defaultThemeName = this.#mapDefaultThemeName(isColorSchemeDark);
        if(source.getIn(["current", "mode"]) !== ThemeMode.SYSTEM) {
            return defaultThemeName;
        }
        const isOneOf = names.includes(source.getIn(["current", "name"]));
        return isOneOf ? source.getIn(["current", "name"]) : defaultThemeName;
    }

    static #mapValue(current: ThemeCurrentType): ThemeType {
        return new ThemeRecord({
            current,
            modes: this.#MODES,
            namesByColorScheme: this.#NAMES_BY_COLOR_SCHEME
        });
    }
}
