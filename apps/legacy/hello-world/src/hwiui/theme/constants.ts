import {Record} from "immutable";

import { ThemeParams } from "./types";
import { ValuesOf } from "../widgets/common";

export const ColorScheme = {
    DARK: "dark",
    LIGHT: "light"
} as const;

export const ThemeMode = {
    DARK: "dark",
    LIGHT: "light",
    SYSTEM: "system"
} as const;

export const ThemeName = {
    BLACK_N_WHITE: "black-n-white",
    DARK_CLASSIC: "dark-classic",
    DARK_CLASSIC_WITH_A_TWIST: "dark-classic-with-a-twist",
    DARK_MODERN_MINIMALIST: "dark-modern-minimalist",
    DARK_NATURE_INSPIRED: "dark-nature-inspired",
    DARK_TECH_INSPIRED: "dark-tech-inspired",
    LIGHT_MODERN_MINIMALIST: "light-modern-minimalist",
    LIGHT_NATURE_INSPIRED: "light-nature-inspired",
    LIGHT_TECH_INSPIRED: "light-tech-inspired",
    WHITE_N_BLACK: "white-n-black"
} as const;

export const DarkThemes = [
    ThemeName.BLACK_N_WHITE,
    ThemeName.DARK_CLASSIC,
    ThemeName.DARK_CLASSIC_WITH_A_TWIST,
    ThemeName.DARK_MODERN_MINIMALIST,
    ThemeName.DARK_NATURE_INSPIRED,
    ThemeName.DARK_TECH_INSPIRED
] as const;

export const LightThemes = [
    ThemeName.LIGHT_MODERN_MINIMALIST,
    ThemeName.LIGHT_NATURE_INSPIRED,
    ThemeName.LIGHT_TECH_INSPIRED,
    ThemeName.WHITE_N_BLACK
] as const;

export type CurrentThemeParams = {
    mode: ValuesOf<typeof ThemeMode>;
    name: ValuesOf<typeof ThemeName>;
    isDarkColoredScheme: boolean;
    remember: boolean;
};

export const CurrentThemeRecord = Record<CurrentThemeParams>({
    mode: ThemeMode.SYSTEM,
    name: ThemeName.BLACK_N_WHITE,
    isDarkColoredScheme: false,
    remember: false
});

export const ThemeRecord = Record<ThemeParams>({
    current: new CurrentThemeRecord(),
    modes: Object.values(ThemeMode),
    namesByColorScheme: {
        light: LightThemes,
        dark: DarkThemes
    }
});
