import {Record} from "immutable";

import { CurrentThemeParams, DarkThemes, LightThemes, ThemeMode, ThemeName } from "./constants";
import { ArrayOf, ValuesOf } from "../widgets/common";

export type ThemeCurrent = {
    mode: ValuesOf<typeof ThemeMode>;
    name: ValuesOf<typeof ThemeName>;
    isDarkColoredScheme: boolean;
    remember: boolean;
};

export type DarkThemeParams = typeof DarkThemes;

export type LightThemeParams = typeof LightThemes;

export type ThemeNamesByColorSchemeParams = {
    light: LightThemeParams;
    dark: DarkThemeParams;
};

export type ThemeParams = {
    current: ThemeCurrent;
    modes: ArrayOf<typeof ThemeMode>;
    namesByColorScheme: ThemeNamesByColorSchemeParams;
};

export type ThemeType = Record<ThemeParams> & Readonly<ThemeParams>;

export type ThemeCurrentType = Record<CurrentThemeParams> & Readonly<CurrentThemeParams>;

export type OnThemeChange = (value: ThemeType) => void;

export type OnThemeChangeEvent = ThemeType | ((previousTheme: ThemeType | null) => ThemeType | null);

export type ThemeContextParams = {
    theme: ThemeType | null,
    onChange: (val: OnThemeChangeEvent) => void,
    onReset: () => void
};
